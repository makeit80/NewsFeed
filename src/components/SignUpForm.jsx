import React, { useState } from 'react';
import { emailLogin, signUp } from '../api/firebase';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/modules/userData';
import { closeLoginModal } from '../redux/modules/showModal';

export default function SignUpForm({ text }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === '회원가입') signUp(form.email, form.password);
        else emailLogin(form.email, form.password);
        dispatch(closeLoginModal());
        navigate('/');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <>
            <Title>Wor__d {text}</Title>
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
                        required
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
                        required
                    />
                </StylePWWrap>
                <StyleBtn>{text}</StyleBtn>
            </StyleForm>
        </>
    );
}

const Title = styled.h1`
    font-size:1.2rem;
    color:white;
    text-align: center;
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-Top: 80px;
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
  border-bottom: 1px solid #bbb;
`;

const StyleBtn = styled.button`
  width: 400px;
  height: 50px;
  margin: 0 auto;
  margin-top: 30px;
  background-color: var(--color-logo);
  color: #fff;
  border: none;
  border-radius: 5px;
`;
