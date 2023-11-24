import { onAuthStateChange, logout } from 'api/firebase';
import React, { useEffect } from 'react';
import User from './User';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUSer } from '../redux/modules/loginData';
import { showLoginModal } from '../redux/modules/showModal';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

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
    console.log(userData.uid)
    logout().then((user) => {
      console.log(user)
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
          {userData.uid && <User />}
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
