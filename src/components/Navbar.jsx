import { onAuthStateChange, login, signIn, signUp, logout } from "api/firebase";
import React, { useState, useEffect } from "react";
import User from "./User";
import SignUp from "./SignUp";

function Navbar() {
  const [user, setUser] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = () => {
    signIn().then((user) => setUser(user));
  };

  const handleLogout = () => {
    logout().then((user) => setUser(user));
  };

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      user && setUser(user);
    });
  }, []);

  return (
    <>
      <navbar>
        {user && console.log(user)}
        <h3>Trend News</h3>
        {user && <User user={user} />}
        {user ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
        {!user && <button onClick={() => setModalOpen(true)}>회원가입</button>}
      </navbar>
      {/* 유저가 없고 회원가입 버튼을 눌렀을 때 회원가입 모달 창 띄움 */}
      {!user && modalOpen && <SignUp />}
    </>
  );
}

export default Navbar;
