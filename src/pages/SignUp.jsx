import React from 'react';
import SignUpForm from 'components/SignUpForm';
import { useNavigate } from 'react-router';

function Signup() {
  const text = '회원가입';
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  };
  return (
    <div>
      <div onClick={() => gotoHome()}>뒤로가기</div>
      <SignUpForm text={text} />
    </div>
  );
}

export default Signup;
