import { onAuthStateChange, googleLogin, logout } from 'api/firebase';
import React, { useState, useEffect } from 'react';
import User from './User';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import SignUpForm from './SignUpForm';
//import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import userData from 'redux/modules/userData';
import { loginUser, logoutUSer } from '../redux/modules/userData';




function Navbar() {
  //const [user, setUser] = useState();
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  console.log(userData);

  useEffect(() => {
    onAuthStateChange((user) => {
      const { uid, displayName, photoURL } = user;
      user && dispatch(loginUser({ uid, displayName, photoURL }));

    });
  }, []);

  const handleClose = () => {
    setOpenLoginModal(false);
    setOpenLoginForm(false);
  }

  const handleLogin = () => {
    //setOpenLoginModal(false);
    //로그인 모달 닫기 요청
    googleLogin()
      .then((user) => {
        const { uid, displayName, photoURL } = user;
        dispatch(loginUser({ uid, displayName, photoURL }));
        navigate('/');
      });
  }

  const openModal = () => {
    setOpenLoginModal(true);
  }

  const closeLoginModal = () => {
    setOpenLoginModal(false);
  }

  const handleLogout = () => {
    logout().then((user) => dispatch(logoutUSer(user)));
  };



  const navigate = useNavigate();
  const gotoSignUpPage = () => {
    navigate('signup/');
  };
  return (
    <>
      <Nav>

        {userData && console.log(userData)}
        <h1>Trend News</h1>
        <div>
          {userData && <User user={userData} />}
          {userData && (<button onClick={() => navigate(`/mypage/${userData.uid}`)}>My Page</button>)}
          {userData ? (<button onClick={handleLogout}>logout</button>) : (<button onClick={() => setOpenLoginModal(true)}>login</button>)}
          {!userData && (<button onClick={() => gotoSignUpPage()}>회원가입</button>)}
        </div>
      </Nav>

    </>
  );
}

const Nav = styled.nav`
  height: 2.5rem;
 display:flex;
 justify-content:space-between;
 background-color: var(--color-bright-blue);
 color:white;

 h1{
  font-size:2rem;
 }
 
  div{
    display:flex;
  }
 button{
  font-size:1.2rem;
  color:white;
  padding:0.5rem;
  background-color: transparent;
 }
`;

const ModalDiv = styled.div`
  display:flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap:1rem;
  
  h3{
    font-size:1.2rem;
    font-weight: bold;
    color:white;
    padding:1rem;
  }
`
const ModalButton = styled.button`
  font-size:1.1rem;
  color:white;
  margin:auto;
  padding:0.5rem;
  border-radius: 1rem;
  background-color: var(--color-bright-blue);
  cursor:pointer;
`

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%'

  },
  content: {
    width: '500px',
    height: '300px',
    zIndex: '100',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderRadius: '10px',
    backgroundColor: 'var(--color-gray-blue)'
  }
}


export default Navbar
