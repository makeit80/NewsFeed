import { onAuthStateChange, login, signUp, logout } from 'api/firebase'
import React, { useState, useEffect } from 'react'
import User from './User';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

function Navbar() {
  const [user, setUser] = useState();
  const [openRegister, setOpenRegister] = useState(false);

  const handleLogin = () => {
    login()
      .then((user) => setUser(user));
  }

  const handleLogout = () => {
    logout()
      .then((user) => setUser(user));
  }

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      user && setUser(user);
    })
  }, []);
  return (
    <>
      <Nav>
        {user && console.log(user)}
        <h3>Trend News</h3>
        {user && <User user={user} />}
        {user ? (<button onClick={handleLogout}>로그아웃</button>) : (<button onClick={handleLogin}>로그인</button>)}
        {!user && <button onClick={() => setOpenRegister(true)}>회원가입</button>}
      </Nav>
      {/* 유저가 없고 회원가입 버튼을 눌렀을 때 회원가입 페이지에 회원가입 폼 띄움 */}
      {!user && openRegister && <SignUpForm />}
    </>
  );
}

const Nav = styled.nav`
 display:flex;
 justify-content:space-between;
 background-color: gray;
`

export default Navbar