import { onAuthStateChange, logout } from 'api/firebase';
import React, { useEffect } from 'react';
import User from './User';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUSer } from '../redux/modules/userData';
import { showLoginModal } from '../redux/modules/showModal';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    onAuthStateChange((user) => {
      const { uid, displayName, photoURL } = user;
      user && dispatch(loginUser({ uid, displayName, photoURL }));
    });
  }, []);

  const handleOpenModal = () => {
    //로그인 모달창 열기
    dispatch(showLoginModal());
  }


  const handleLogout = () => {
    console.log('로그아웃 클릭');
    logout().then((user) => {
      console.log(user);
      dispatch(logoutUSer(user));
    });
  };

  const gotoSignUpPage = () => {
    navigate('signup/');
  };
  return (
    <>
      <Nav>
        <h1>Wor__d</h1>
        <div>
          {userData.uid && <User user={userData} />}
          {userData.uid && <button onClick={() => navigate(`/mypage/${userData.uid}`)}>My Page</button>}
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
    &:focus {
      outline: none;
    }
  }

  div {
    display: flex;
    position: absolute;
    right: 3%;
    top: 35%;
  }

  button {
    font-size: 18px;
    color: #a58d7f;
    font-weight: lighter;

    padding-left: 15px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: #84898c;
      transition: 0.5s;
    }
  }
`;




export default Navbar;
