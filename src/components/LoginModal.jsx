import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { googleLogin, emailLogin } from 'api/firebase';
import SignUpForm from './SignUpForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/modules/loginData';
import { showLoginForm, closeLoginForm, closeLoginModal } from '../redux/modules/showModal';
import { useNavigate } from 'react-router';

export default function LoginModal() {
    const navigate = useNavigate();
    const isLoginModal = useSelector((state) => state.showModal.isLoginModal);
    const isLoginForm = useSelector((state) => state.showModal.isLoginForm)
    const dispatch = useDispatch();

    const [form, setform] = useState({email: '', password: ''});

    const handleClose = () => {
        //로그인폼 안보이도록 설정
        dispatch(closeLoginForm());
        //로그인 모달창 닫히도록 설정
        dispatch(closeLoginModal());
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((user) => {
                const { uid, photoURL, displayName } = user;
                dispatch(loginUser({ uid, photoURL, displayName }));
                dispatch(closeLoginModal());
            });
    }

    const handleEmailLogin = (e) => {
        e.preventDefault();

        emailLogin(form.email, form.password);
        dispatch(closeLoginModal())
        // dispatch(userList())
        navigate('/')

        setform({email: '', password: ''})
    }
    
    const onChangeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value }
        )
    }
    )


    return (
        <Modal
            isOpen={isLoginModal}
            onRequestClose={handleClose}
            style={customModalStyles}>
            {!isLoginForm &&
                <ModalDiv>
                    <ModalButton onClick={handleGoogleLogin} top={'25%'}><FcGoogle /> 구글 계정으로 로그인</ModalButton>
                    <ModalButton onClick={() => dispatch(showLoginForm())} top={'55%'}><MdEmail /> 이메일로 로그인</ModalButton>
                </ModalDiv>
            }
            {isLoginForm &&
            <StForm onSubmit={handleEmailLogin}>
                <StInput        
                value={form.email}
                onChange={onChangeHandler}
                
                type='email' 
                name='email' 
                placeholder='Email'
                autocomplete='off'
                
                top={'10%'}>
                </StInput>

                <StInput
                value={form.password}
                onChange={onChangeHandler}
                
                type='password' 
                name='password' 
                placeholder='password'
                autocomplete='off'
                
                top={'30%'}>
                </StInput>

                <StButton>로그인</StButton>
            </StForm>
            }
        </Modal>
    );
}

const ModalDiv = styled.div`
display:flex;
flex-direction: column;
justify-items: center;
align-items: center;
gap:1rem;

position: relative;

width: 100%;
height: 100%;

h3{
font-size:1.2rem;
font-weight: bold;
color:white;
padding:1rem;
}
`
const ModalButton = styled.button`
width: 300px;
height: 50px;

font-size:1.1rem;
color:white;
margin-bottom: 1rem;
padding:0.5rem;
border-radius: 5px;
background-color: #484848;

position: absolute;
top: ${(props) => props.top};

cursor:pointer;

&:hover {
background-color: #292929;
transition: 1s;
}
`

const customModalStyles = {
overlay: {
backgroundColor: 'rgba(189, 189, 189, 0.6)',
width: '100%',
height: '100%'

},
content: {
width: '500px',
height: '350px',
zIndex: '100',
position: 'fixed',
top: '50%',
left: '50%',
transform: 'translate(-50%,-50%)',
borderRadius: '10px',
backgroundColor: '#353535e3'
}
}

const StForm = styled.form`
width: 100%;
height: 100%;

display:flex;
flex-direction: column;
justify-items: center;
align-items: center;

position: relative;
`

const StInput = styled.input`
width: 390px;
height: 40px;

position: absolute;
top: ${(props) => props.top};

border: none;
border-bottom: 2px solid #bbb;
background-color: #3b3b3be2;
outline: none;

color: white;
`
const StButton = styled.button`
position: absolute;
bottom: 20%;

width: 200px;
height: 30px;

background-color: #484848;
border-radius: 10px;
color: white;
letter-spacing: 2px;

&:hover {
background-color: #5b5b5b;
transition: 0.5s;
}
`

