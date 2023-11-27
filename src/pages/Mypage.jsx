import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'api/firebase';
import MyPageModal from 'components/myPageModal';
import { showMyPageModal } from 'redux/modules/showMyPageModal';
import { deleteImg } from 'redux/modules/userList';
import UserCommentList from 'components/UserCommentList';

function Mypage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const userList = useSelector((state) => state.userList);

  let target = userList.value.find((item) => item.id === userData.uid);
  target = target ? target : userData;
  console.log('target', target);
  const updateName = async () => {
    const dataRef = doc(db, "users", target.id)
    await updateDoc(dataRef, { ...target, photoURL: 'https://www.lab2050.org/common/img/default_profile.png' })
  }
  function deleteImage() {
    updateName()
    dispatch(deleteImg({ id: target.id }))
  }

  return (
    <Stbody>
      <StMain>
        <StSection height={'500px'}>
          <StLabel top={'3%'} left={'2.5%'} fontSize={'35px'} color={'#c78159;'}>
            Profile
          </StLabel>
          <StFigure>
            <img src={target.photoURL} alt='avatar'></img>
          </StFigure>
          <StLabel top={'45%'} left={'41%'} fontSize={'50px'} color={'white'}>
            {target.displayName}
          </StLabel>
          <StButton right={'2.5%'} onClick={() => { dispatch(showMyPageModal('Image')) }}>이미지 업로드</StButton>
          <StButton right={'17%'} onClick={deleteImage}>이미지 삭제</StButton>
          <StButton right={'30%'} onClick={() => { dispatch(showMyPageModal('Name')) }}>닉네임 변경</StButton>
        </StSection>
        <StSection height={'800px'}>
          <div style={{ height: '80px' }}></div>
          <StLabel top={'3%'} left={'2.5%'} fontSize={'35px'} color={'#c78159;'}>
            Comments
          </StLabel>
          <StUl>
            <UserCommentList />
          </StUl>
        </StSection>
      </StMain>
      <MyPageModal id={target.id}></MyPageModal>
    </Stbody>
  );
}



// Layout
const Stbody = styled.body`
  width: 100vw;
  height: 100vh;
  background-color: black;

  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StMain = styled.main`
  margin-top: 110px;
  width: 1000px;
`;

// Profile
const StSection = styled.section`
  background-color: #232323;
  height: ${(props) => props.height};
  width: 100%;

  position: relative;

  margin-bottom: 80px;

  &:hover {
    transition: 0.5s;
    border: 1px solid #808080;
  }
`;
const StFigure = styled.figure`
  position: absolute;
  top: 30%;
  left: 10%;

  width: 225px;
  height: 225px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #8e8e8e;
  }
`;
const StButton = styled.button`
  position: absolute;
  top: 4.5%;
  right: ${(props) => props.right};

  border: 1px solid #c2c2c2;
  border-radius: 19px;
  background-color: transparent;
  padding: 10px;

  font-size: 15px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #c2c2c2;

  cursor: pointer;

  &:hover {
    color: #8e8e8e;
    border: 1px solid #8e8e8e;
    transition: 0.5s;
  }
`;

const StUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 100px;

  height: 690px;
  margin: 20px;

  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    background-color: #232323;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84898c3a;
    border-radius: 30px;
  }
`;



// text (props)
const StLabel = styled.label`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
`;


export default React.memo(Mypage);
