import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeMyPageModal, mypageInputValue } from 'redux/modules/showMyPageModal';
import { editUser } from 'redux/modules/userList';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'api/firebase';


export default function MyPageModal(target) {
    // Setting
    const isUpdateOpen = useSelector((state) => state.myPageModal.isUpdateOpen);
    const updateType = useSelector((state) => state.myPageModal.updateType);

    const dispatch = useDispatch();

    const [form, setForm] = useState({ displayName: '', photoURL: '' });

    // Firebase
    // TODO : 이미지, 닉네임 변경 기능
    // dispatch로 reduce에 변경값 같이 저장
    // TODO : 변경 input 값 모달창 구현
    const updateName = async (key, value) => {
        const dataRef = doc(db, "users", target.id)
        await updateDoc(dataRef, { ...target, [key]: value })
    }

    // Handler
    // function closeHandler() {
    //     dispatch(closeMyPageModal(false))
    // }
    // TODO : 리팩토링 필요
    function onSubmitHandler(e) {
        e.preventDefault();
        dispatch(mypageInputValue(e.target[0].value))
        dispatch(editUser({ id: target.id, value: e.target[0].value, key: e.target[0].name }))
        updateName(e.target[0].name, e.target[0].value)
        dispatch(closeMyPageModal())
        setForm({ displayName: '', photoURL: '' })
    }

    function onChangeHandler(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    return (
        <Modal
            style={customModalStyles}
            isOpen={isUpdateOpen}
            onRequestClose={() => { dispatch(closeMyPageModal(false)) }}
            className={"removeModal"}
        >
            {
                updateType === 'Name' &&
                <StModalForm onSubmit={onSubmitHandler}>
                    <StInput
                        type='text'
                        value={form.displayName}
                        onChange={onChangeHandler}
                        name='displayName'
                        placeholder='변경할 이름을 입력해주세요'>
                    </StInput>
                    <StModalButton type='submit'>완료</StModalButton>
                </StModalForm>
            }
            {
                updateType === 'Image' &&
                <StModalForm onSubmit={onSubmitHandler}>
                    <StInput
                        type='text'
                        value={form.photoURL}
                        onChange={onChangeHandler}
                        name='photoURL'
                        placeholder='이미지 경로를 추가해주세요'>
                    </StInput>
                    <StModalButton type='submit'>완료</StModalButton>
                </StModalForm>
            }
        </Modal>
    )
}

// Modal
const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

        backgroundColor: '#1c1c1ce0',

    }
}
const StModalForm = styled.form`
width: 100%;
height: 100%;

position: relative;
`
const StInput = styled.input`
width: 300px;
height: 40px;

position: absolute;
top: 35%;
left: 20%;

border: none;
border-bottom: 1px solid #bbb;
background-color: #1c1c1ce0;
outline: none;

color: white;
font-size: 15px;
text-align: center;

&:focus {
background-color: #292929df;
transition: 0.5s;
}
`
const StModalButton = styled.button`
width: 130px;
height: 28px;

position: absolute;
bottom: 15%;
left: 37%;

background-color: #565656;
border-radius: 5px;

color: #cccccc;
letter-spacing: 3px;
text-align: center;

cursor: pointer;

&:hover {
background-color: #303030;
transition: 0.5s;
}
`

Modal.setAppElement('#root');