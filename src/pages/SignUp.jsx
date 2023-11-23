import React from 'react';
import SignUpForm from 'components/SignUpForm';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  };
  return (
    <div>
      <div onClick={() => gotoHome()}>뒤로가기</div>
      <SignUpForm text='회원가입' />
    </div>
  );
}

export default Signup;
