import React from 'react';
import SignUpForm from 'components/SignUpForm';
import { useNavigate } from 'react-router';

// TODO : SignUpForm과 합치기
function Signup() {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  };
  return (
    <div>
      <div onClick={() => gotoHome()}>뒤로가기</div>
      <SignUpForm/>
    </div>
  );
}

export default Signup;
