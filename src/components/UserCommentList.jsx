import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';


import { collection, getDocs, query } from "firebase/firestore";
import { db } from 'api/firebase';

export default function UserCommentList() {
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
      // console.log('initialData ====> ', initialData)
      // console.log('commentList ====> ', commentList)
    }
    fetchData()
  }, [])

  return (
    <>
      {
        commentList
          .filter((item) => {
            return item.id === userData.uid
          })
          .sort((a, b) => {
            return a.date - b.date;
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

  background-color: #4b4b4b;
  border-radius: 20px 20px 0px 20px;
  color: #dfdfdf;

  padding: 15px;
  margin: 5px;
  margin-bottom: 25px;

  &:hover {
    background-color: #676767;
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

