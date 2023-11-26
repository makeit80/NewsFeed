import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userList } from '../redux/modules/userList';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { signUp } from '../api/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from 'api/firebase';

export default function SignUp() {
  const navigate = useNavigate();


  // 1. Input info
  const [form, setForm] = useState({name: '', email: '', password: '', passwordConfirm: ''});

  // 2. Error message
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =useState('');

  // 3. Vaildation check
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 5. Onchange
  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
    // (1) Name
    if (name === 'name') {
      return value.length <= 2 || value.length >= 10 
      ? (
        setNameMessage('2글자 이상 10글자 이하로 작성해주세요'),
        setIsName(false)
        )
      : (
        setNameMessage('완료'),
        setIsName(true)
      )
    // (2) Email
    } else if (name === 'email') {
      const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      return !emailRegex.test(value) 
      ? (
        setEmailMessage('이메일 형식을 다시 확인해주세요.'),
        setIsEmail(false)
      )
      : (
        setEmailMessage('완료'),
        setIsEmail(true)
      )
    // (3) Password
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      return !passwordRegex.test(value)
      ? (
        setPasswordMessage('숫자, 영문, 특수문자를 포함해 8자리 이상 작성해주세요.'),
        setIsPassword(false)
      )
      : (
        setPasswordMessage('완료'),
        setIsPassword(true)
      )
    // (4) Password confirm
    } else if (name === 'passwordConfirm') {
      return form.password !== value
      ? (
        setPasswordConfirmMessage('비밀번호가 일치하지 않아요.'),
        setIsPasswordConfirm(false)
      )
      : (
        setPasswordConfirmMessage('완료'),
        setIsPasswordConfirm(true)
      )
    }
  }, [form]);


  // firebase add data
  const addData = (uid) => {
    const photoURL = 'https://www.lab2050.org/common/img/default_profile.png'
    const displayName = form.name
    const newData = {id : uid, photoURL: photoURL, displayName: displayName}  
    setDoc(doc(db, "users", String(uid)), newData)
  };

  // 4. Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : fireStore에서 계정관리 V
    signUp(form.email, form.password)
    .then((user) => {
      const uid = user.uid;
      addData(uid)
    });
    navigate('/');
  }
  

  return (
    <Stbody>
      <StyleForm onSubmit={handleSubmit}>
        <StDiv>
          <StInput 
          type='text' 
          name='name' 
          placeholder='Name' 
          onChange={onChangeHandler} 
          autocomplete='off' />

          {form.name.length > 0 && 
          <StSpan className={`message ${isName ? 'success' : 'error'}`}>
            {nameMessage}
          </StSpan>}
        </StDiv>

        <StDiv>
          <StInput 
          type='email' 
          name='email' 
          placeholder='Email' 
          onChange={onChangeHandler} 
          autocomplete='off' />

          {form.email.length > 0 && 
          <StSpan className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </StSpan>}
        </StDiv>

        <StDiv>
          <StInput 
          type='password' 
          name='password' 
          placeholder='Password' 
          onChange={onChangeHandler} 
          autocomplete='off' />

          {form.password.length > 0 && <StSpan className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</StSpan>}
        </StDiv>
        <StDiv>
          <StInput 
          type='password' 
          name='passwordConfirm' 
          placeholder='Confirm' 
          onChange={onChangeHandler} 
          autocomplete='off' />

          {form.password.length > 0 && 
          <StSpan className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>
            {passwordConfirmMessage}
          </StSpan>}
        </StDiv>
        
        <StyleBtn
        type='submit'
        disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
        >회원가입</StyleBtn>
      </StyleForm>
    </Stbody>
  );
}



const Stbody = styled.body`
  width: 100vw;
  height: 100vh;
  background-color: black;
`

const StyleForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-Top: 200px;

`;
const StDiv = styled.div`
  height: 120px;
  width: 500px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: relative;

`
const StInput = styled.input`
  width: 390px;
  height: 40px;

  position: absolute;
  top: 0%;

  border: none;
  border-bottom: 1px solid #bbb;
  background-color: black;
  outline: none;

  color: white;
`;
const StSpan = styled.span`
  height: 40px;

  position: absolute;
  bottom: 10%;

  &.success {
    transition: 0.5s;
    color: #2bcf54;
  }
  &.error {
    transition: 0.5s;
    color: #ff2727;
  }
`

const StyleBtn = styled.button`
  width: 400px;
  height: 50px;
  margin: 0 auto;
  margin-top: 25px;
  background-color: var(--color-logo);
  border: none;
  border-radius: 5px;

  color: #fff;
  font-size: 15px;
  letter-spacing: 3px;
  font-weight: lighter;
  
  cursor: pointer;

  &:hover {
    background-color: #aa6f4c;
    transition: 0.5s;
  }
`;