import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUSer } from '../redux/modules/userData';
import { showLoginModal } from '../redux/modules/showModal';
import { userList } from 'redux/modules/userList';

import { onAuthStateChange, logout } from 'api/firebase';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from 'api/firebase';

import LoginModal from './LoginModal';
import User from './User';


export default function Navbar() {
  // Setting
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const users = useSelector((state) => state.userList);


  // Accounts check
  // TODO : onSnapshot 으로 변경데이터 가져오기
  const loginRegister = useSelector((state) => state.userData)
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);

      const initialData = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        }
        initialData.push(data)
      })
      dispatch(userList(initialData))
    }
    fetchData();
  }, [loginRegister])

  const target = users.value.find((item) => item.id === userData.uid);


  // Auth
  useEffect(() => {
    onAuthStateChange((user) => {
      const { uid, photoURL, displayName } = user;
      user && dispatch(loginUser({ uid, photoURL, displayName }));
    });
  }, []);

  const handleOpenModal = () => {
    dispatch(showLoginModal());
  };

  const handleLogout = () => {
    logout().then((user) => {
      dispatch(logoutUSer(user))
    }).catch((error) => {
      console.log(error)
    });;
  };

  const gotoSignUpPage = () => {
    navigate('signup/');
  };


  return (
    <>
      <Nav>
        <Link to="/">
          <h1>Wor__d</h1>
        </Link>
        <div>
          {userData.uid && <User target={target} />}
          {userData.uid ? (
            <button onClick={handleLogout}>logout</button>
          ) : (
            <button onClick={handleOpenModal}>login</button>
          )}
          {!userData.uid && <button onClick={() => gotoSignUpPage()}>회원가입</button>}
        </div>
      </Nav>
      <LoginModal />
    </>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #232323;
  color: white;
  z-index: 1;

  &:hover {
    transition: 0.5s;
    box-shadow: 1px 1px 1px 1px #a58d7f;
  }

  h1 {
    position: absolute;
    left: 3%;
    top: 27%;
    font-size: 2rem;
    font-weight: bold;
    color: #c78159;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    &:hover {
      color: #84898c;
      transition: 0.5s;
    }
  }

  div {
    display: flex;
    position: absolute;
    right: 3%;
    top: 28%;
  }

  button {
    font-size: 18px;
    color: #a58d7f;
    font-weight: lighter;
    height: 40px;
    padding-left: 15px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: #84898c;
      transition: 0.5s;
    }
  }
`;
