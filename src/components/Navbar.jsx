import { onAuthStateChange, googleLogin, logout } from 'api/firebase';
import React, { useState, useEffect } from 'react';
import User from './User';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';



function Navbar() {
  const [user, setUser] = useState();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLogin = () => {
    setOpenLoginModal(false);
    googleLogin()
      .then((user) => {
        setUser(user)
      });
  }

  const handleLogout = () => {
    logout().then((user) => setUser(user));
  };

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      user && setUser(user);
    });
  }, []);

  const navigate = useNavigate();
  const gotoSignUpPage = () => {
    navigate('signup/');
  };
  return (
    <>
      <Nav>
        {user && console.log(user)}
        <h1>Wor__d</h1>
        <div>
          {user && <User user={user} />}
          {user && (<button onClick={() => navigate(`/mypage/${user.uid}`)}>My Page</button>)}
          {user ? (<button onClick={handleLogout}>logout</button>) : (<button onClick={() => setOpenLoginModal(true)}>login</button>)}
          {!user && <button onClick={() => gotoSignUpPage()}>회원가입</button>}
        </div>
      </Nav>
      {/* 유저가 없고 회원가입 버튼을 눌렀을 때 회원가입 페이지에 회원가입 폼 띄움 */}
      {openLoginModal &&
        <Modal
          isOpen={openLoginModal}
          onRequestClose={() => setOpenLoginModal(false)}
          style={customModalStyles}
          contentLabel='Select Login Type'

        >
          <ModalDiv>
            <h3>Trend News 로그인</h3>
            <ModalButton onClick={handleLogin}><FcGoogle />구글 계정으로 로그인</ModalButton>
            <ModalButton><MdEmail />이메일로 로그인</ModalButton>
          </ModalDiv>
        </Modal>}
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

z-index: 1;

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

const customModalStyles = ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%'

  },
  content: {
    width: '350px',
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
