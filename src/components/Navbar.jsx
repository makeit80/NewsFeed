import { onAuthStateChange, googleLogin, logout } from 'api/firebase';
import React, { useState, useEffect } from 'react';
import User from './User';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';
import { useNavigate } from 'react-router';


function Navbar() {
  const [user, setUser] = useState();
  const [openRegister, setOpenRegister] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleLogin = () => {
    googleLogin()
      .then((user) => setUser(user));
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
    setOpenRegister(true);
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
      {!user && openRegister && <SignUpForm />}

    </>
  );
}

const Nav = styled.nav`
position: relative;
height: 80px;

background-color: #373737;
color:white;

&:hover {
box-shadow: 2px 2px 2px 2px white;
}

h1{
position: absolute;
left: 3%;
top: 25%;

font-size:2rem;
font-weight: bold;
}

div{
display:flex;
}

button{
position: absolute;
right: ${(props) => props.right};
top: 25%;

font-size:1.2rem;
color:white;
padding:0.5rem;
background-color: transparent;
}
`;

export default Navbar
