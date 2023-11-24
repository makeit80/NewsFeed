import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { googleLogin } from 'api/firebase';
import SignUpForm from './SignUpForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/modules/userData';
import { showLoginForm, closeLoginForm, closeLoginModal } from '../redux/modules/showModal';

export default function LoginModal() {
    const isLoginModal = useSelector((state) => state.showModal.isLoginModal);
    const isLoginForm = useSelector((state) => state.showModal.isLoginForm)
    const dispatch = useDispatch();

    const handleClose = () => {
        //로그인폼 안보이도록 설정
        dispatch(closeLoginForm());
        //로그인 모달창 닫히도록 설정
        dispatch(closeLoginModal());
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((user) => {
                const { uid, photoURL } = user;
                dispatch(loginUser({ uid, photoURL }));
                //모달 창 닫기 요청
                dispatch(closeLoginModal());
            });
    }



    return (
        <Modal
            isOpen={isLoginModal}
            onRequestClose={handleClose}
            style={customModalStyles}>
            {!isLoginForm &&
                <ModalDiv>
                    <h3>Wor__d 로그인</h3>
                    <ModalButton onClick={handleGoogleLogin}><FcGoogle />구글 계정으로 로그인</ModalButton>
                    {/* setOpenLoginForm(true -> 이메일 로그인 버튼) */}
                    <ModalButton onClick={() => dispatch(showLoginForm())}><MdEmail />이메일로 로그인</ModalButton>
                </ModalDiv>
            }
            {isLoginForm && <SignUpForm text="로그인" />}
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
  margin-bottom: 1rem;
  padding:0.5rem;
  border-radius: 1rem;
  background-color: var(--color-logo);
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
        height: '350px',
        zIndex: '100',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-choco)'
    }
}

