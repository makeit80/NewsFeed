import { onAuthStateChange, googleLogin, logout } from 'api/firebase';
import React, { useState, useEffect } from 'react';
import User from './User';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUSer } from '../redux/modules/userData';




function Navbar() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);


  useEffect(() => {
    onAuthStateChange((user) => {
      const { uid, displayName, photoURL } = user;
      user && dispatch(loginUser({ uid, displayName, photoURL }));

    });
  }, []);

  const openModal = () => {
    setOpenLoginModal(true);
  }

  const closeModal = () => {
    setOpenLoginModal(false);
  }

  const handleLogout = () => {
    logout().then((user) => {
      dispatch(logoutUSer(user))
    });
  };



  const navigate = useNavigate();
  const gotoSignUpPage = () => {
    navigate('signup/');
  };
  return (
    <>
      <Nav>
        {userData && console.log(userData)}
        <h1>Wor__d</h1>
        <div>
          {userData.uid && <User user={userData} />}
          {userData.uid && (<button onClick={() => navigate(`/mypage/${userData.uid}`)}>My Page</button>)}
          {userData.uid ? (<button onClick={handleLogout}>logout</button>) : (<button onClick={() => setOpenLoginModal(true)}>login</button>)}
          {!userData.uid && (<button onClick={() => gotoSignUpPage()}>회원가입</button>)}
        </div>
      </Nav>
      {openLoginModal && <LoginModal openLoginModal={openLoginModal} onClose={closeModal} />}

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
color:white;

&:hover {
transition: 0.5s;
box-shadow: 1px 1px 1px 1px #A58D7F;
}

h1{
position: absolute;
left: 3%;
top: 27%;

font-size:2rem;
font-weight: bold;
color: #c78159;
&:focus {      
  outline: none;  
}
}

div{
display:flex;
position: absolute;
right: 3%;
top: 35%;
}

button{
font-size:18px;
color: #A58D7F;
font-weight: lighter;

padding-left:15px;
background-color: transparent;
cursor: pointer;

&:hover {
color: #84898C;
transition: 0.5s;
}
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
