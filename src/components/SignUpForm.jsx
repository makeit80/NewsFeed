import React, { useState } from 'react';
import { signUp } from 'api/firebase';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

export default function SignUpForm() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/');
  };

  const hadleOnclickSignUp = () => {
    signUp(form.email, form.password);
    gotoHome();
  };

  return (
    <>
      <div
        onClick={() => {
          gotoHome();
        }}
      >
        뒤로가기
      </div>
      <StyleForm onSubmit={handleSubmit}>
        <StyleEmailWrap>
          <StyleLabel htmlFor="email">Email : </StyleLabel>
          <StyleInput
            type="email"
            id="email"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </StyleEmailWrap>
        <StylePWWrap>
          <StyleLabel htmlFor="password">Password : </StyleLabel>
          <StyleInput
            type="password"
            id="password"
            placeholder="6자 이상 입력하세요"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </StylePWWrap>
        <StyleBtn onClick={hadleOnclickSignUp}>회원가입</StyleBtn>
      </StyleForm>
    </>
  );
}

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 200px;
`;
const StyleEmailWrap = styled.div`
  width: 400px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 10px auto;
`;
const StylePWWrap = styled.div`
  width: 400px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
`;
const StyleLabel = styled.label`
  display: none;
`;
const StyleInput = styled.input`
  width: 390px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #333;
`;

const StyleBtn = styled.button`
  width: 400px;
  height: 50px;
  margin: 0 auto;
  margin-top: 30px;
`;