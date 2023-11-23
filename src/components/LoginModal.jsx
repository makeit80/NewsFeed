import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-modal';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { googleLogin } from 'api/firebase';
import { useNavigate } from 'react-router';
import SignUpForm from './SignUpForm';

export default function LoginModal({ onOpen, onClose, onUpdateUser }) {
    const [openLoginForm, setOpenLoginForm] = useState(false);
    const navigate = useNavigate;
    const handleOpen = () => {
        onOpen();
    }
    const handleClose = () => {
        setOpenLoginForm(false);
        onClose();
    }

    const handleLogin = () => {
        //setOpenLoginModal(false);
        //로그인 모달 닫기 요청
        googleLogin()
            .then((user) => {
                onUpdateUser(user);
                navigate('/');
            });
    }

    return (
        <Modal
            isOpen={handleOpen}
            onRequestClose={handleClose}
            style={customModalStyles}>
            {!openLoginForm &&
                <ModalDiv>
                    <h3>Wor__d 로그인</h3>
                    <ModalButton onClick={handleLogin}><FcGoogle />구글 계정으로 로그인</ModalButton>
                    <ModalButton onClick={() => setOpenLoginForm(true)}><MdEmail />이메일로 로그인</ModalButton>
                </ModalDiv>
            }
            {openLoginForm && <SignUpForm text="로그인" />}
        </Modal>
    );
}

const ModalDiv = styled.div`
  display:flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap:1rem;
  
  h3{
    font-size:1.2rem;
    font-weight: bold;
    color:white;
    padding:1rem;
  }
`
const ModalButton = styled.button`
  font-size:1.1rem;
  color:white;
  margin:auto;
  padding:0.5rem;
  border-radius: 1rem;
  background-color: var(--color-bright-blue);
  cursor:pointer;
`

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        height: '100%'

    },
    content: {
        width: '500px',
        height: '300px',
        zIndex: '100',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-gray-blue)'
    }
}

