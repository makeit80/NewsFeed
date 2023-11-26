import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';


import { collection, getDocs, query } from "firebase/firestore";
import { db } from 'api/firebase';

export default function UserCommentList() {
  // TODO : 로그인 하고 바로 마이페이지로 가면 오류뜸
  // 이유 : KeywordChat에서 데이터를 받아와야 하는데 페이지 로드가 안되었기 때문
  const userData = useSelector((state) => state.userData);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "comments"));
      const querySnapshot = await getDocs(q);
      const initialData = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data() }
        initialData.push(data)
      })
      setCommentList(initialData)
      console.log('initialData ====> ', initialData)
      console.log('commentList ====> ', commentList)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* {
        filterComments.map(comment => {
          const { keyword, text, date } = comment;
          return (
            <StLi key={date} >
              <StSpan>키워드  {keyword}</StSpan>
              <StP>내용  {text}</StP>
              <StTime> {date}</StTime>
            </StLi>
          );
        }) */}
      {
        commentList
          .filter((item) => {
            return item.id === userData.uid
          })
          .map((item) => {
            return (
              <StLi>
                <StSpan>{item.keyword}</StSpan>
                <StP>{item.text}</StP>
                <StTime>{item.date}</StTime>
              </StLi>
            )
          })
      }
    </>
  );
}

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

