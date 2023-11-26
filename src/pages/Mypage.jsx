import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { collection, doc, getDocs, query, addDoc, updateDoc } from 'firebase/firestore';
import { db } from 'api/firebase';
import { userList } from 'redux/modules/userList';
import UserCommentList from 'components/UserCommentList';

function Mypage() {
  // TODO : 조건문으로 uid가 store에 있으면 기존 데이터 반환, 없으면 userData의 값을 반환
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  const userList = useSelector((state) => state.userList);
  const target = userList.value.find((item) => item.id === userData.uid);
  console.log('userList.value ===> ', userList.value);
  console.log('userData.uid ===> ', userData.uid);

  console.log('target ===> ', target);

  // firebase Data check
  // useEffect(() => {
  //     const fetchData = async () => {
  //         const q = query(collection(db, "users", target.id));
  //         const querySnapshot = await getDocs(q);

  //         const initialData = [];
  //         querySnapshot.forEach((doc) => {
  //             const data = {
  //                 id : doc.id,
  //                 ...doc.data(),
  //             }
  //             console.log('data', data)
  //             initialData.push(data)
  //         })
  //     }
  //     fetchData()
  // }, [])

  // const addData = async (e) => {
  //     e.preventDefault();
  //     const newData = { displayName: 'test', photoURL: 'test2' , id: Date.now()}
  //     setBaseData((prev) => {
  //         return[...baseData, newData];
  //     })
  //     console.log('add ====>', baseData)

  //     const collectionRef = collection(db, "test")
  //     await addDoc(collectionRef, newData)

  // }

  // const targetData = baseData.find((item) => item.id === baseData[0].id)
  // console.log('targetData',targetData)
  // const updateData = async () => {
  //     const dataRef = doc(db, "test", baseData[0].id)
  //     await updateDoc(dataRef, {...baseData[0], text: 'change'})
  // }

  // TODO : 계정 uid, displayName(기본값), photoURL(기본값) 를 id값을 uid 기준으로 Store에 저장
  // uid params 로 find id
  // store에 저장된 displayName, photoURL 가져오기

  return (
    <Stbody>
      <StMain>
        <StSection height={'500px'}>
          <StLabel top={'3%'} left={'2.5%'} fontSize={'35px'} color={'#c78159;'}>
            Profile
          </StLabel>
          <StFigure>
            {/* <img src={target.photoURL}></img> */}
            <img src={userData.photoURL}></img>
          </StFigure>
          <StLabel top={'45%'} left={'41%'} fontSize={'50px'} color={'white'}>
            {/* {target.displayName} */}
            {userData.displayName}
          </StLabel>
          <StButton right={'2.5%'}>이미지 업로드</StButton>
          <StButton right={'17%'}>이미지 삭제</StButton>
          <StButton right={'30%'}>닉네임 변경</StButton>
          {/* <StButton right={'50%'} onClick={addData}>테스트</StButton>
                    <StButton right={'60%'} onClick={updateData}>업데이트</StButton> */}
        </StSection>
        <StSection height={'800px'}>
          <div style={{ height: '80px' }}></div>
          <StLabel top={'3%'} left={'2.5%'} fontSize={'35px'} color={'#c78159;'}>
            Comments
          </StLabel>
          <StUl>
            {/* <StLi key={userData.uid}> */}
            {/* <StSpan>키워드</StSpan>
                            <StP>내용</StP>
                            <StTime>시간</StTime> */}
            <UserCommentList />
            {/* </StLi> */}
            {/* <StLi>
                            <StSpan>키워드</StSpan>
                            <StP>내용</StP>
                            <StTime>시간</StTime>
                        </StLi>
                        <StLi>
                            <StSpan>키워드</StSpan>
                            <StP>내용</StP>
                            <StTime>시간</StTime>
                        </StLi>
                        <StLi>
                            <StSpan>키워드</StSpan>
                            <StP>내용</StP>
                            <StTime>시간</StTime>
                        </StLi> */}
          </StUl>
        </StSection>
      </StMain>
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

// Comment
const StDiv = styled.div`
  margin-top: 80px;
`;
const StUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 100px;

  height: 500px;

  margin: 20px;
  overflow: auto;
  overflow-x: hidden;
`;

const StLi = styled.li`
  position: relative;

  background-color: #989898;
  border-radius: 20px 20px 0px 20px;

  padding: 15px;
  margin: 5px;
  margin-bottom: 25px;

  &:hover {
    background-color: #e2e2e2;
    transition: 0.5s;
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
const StSpan = styled.span`
  position: absolute;
  top: 39%;
  left: 3%;
`;
const StTime = styled.time`
  position: absolute;
  top: 39%;
  right: 10%;
`;
const StP = styled.p`
  position: absolute;
  top: 39%;
  left: 30%;
`;

export default React.memo(Mypage);
