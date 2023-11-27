import { db } from 'api/firebase';
import KeywordNews from 'components/KeywordNews';
import UserComment from 'components/UserComment';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment, getComment } from 'redux/modules/comments';
import styled from 'styled-components';

function KeywordChat() {
  const param = useParams();

  const [text, setText] = useState('');

  const comments = useSelector((state) => state.comments);

  const userData = useSelector((state) => state.userData);

  const filterComments = comments.filter((comment) => comment.keyword === param.id).sort((a, b) => b.id - a.id);
  //const [updateComments, setUpdateComments] = useState([...comments]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'comments'));
      const querySnapshot = await getDocs(q);

      const initialComments = [];
      querySnapshot.forEach((doc) => {
        const data = {
          docId: doc.id,
          ...doc.data()
        };
        initialComments.push(data);
      });
      dispatch(getComment(initialComments));
    };
    fetchData();
  }, []);

  const newComment = {
    userImage: userData.photoURL,
    text,
    keyword: param.id,
    id: userData.uid,
    userName: userData.displayName,
    isUpdate: false,
    date: new Date().toLocaleString()
  };


  const addCommenthandler = (e) => {
    e.preventDefault();
    setText('');
    if (!userData.uid) {
      alert('로그인 후 댓글을 달아주세요.');
      return;
    }
    if (text.trim() === '') return;
    dispatch(addComment(newComment));
    addDoc(collection(db, 'comments'), newComment);
  };

  //const [isCommentUpdate, setIsCommentUpdate] = useState(false);

  const deleteBtn = (id) => {
    console.log(id);
  };

  return (
    <Stbackground>
      <KeywordNews />
      <StForm onSubmit={addCommenthandler}>
        <StCommentInput
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 남겨주세요"
        />
        <StCommentBtn type="submit">입력</StCommentBtn>
      </StForm>
      <Stdiv>
        {filterComments &&
          filterComments
            .sort((a, b) => {
              return new Date(a.Date).getTime() - new Date(b.date).getTime();
            }).reverse()
            .map((item) => (
              <StUserCommentWrap>
                <UserComment key={item.keyword}
                  comments={comments}
                  handler={{
                    deleteBtn
                  }}
                >
                  {item}
                </UserComment>
              </StUserCommentWrap>
            ))}
      </Stdiv>
    </Stbackground>
  );
}

const Stbackground = styled.div`
  background-color: #000000;
  padding: 80px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Stdiv = styled.div`
  /* text-align: center;
  margin: 20px auto;
  background-color: #eee;
  width: 400px;
  height: 50px;
  line-height: 50px; */
  height: 800px;
  width: 800px;
  margin-top: 50px;

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

const StForm = styled.form`
  width: 800px;
  height: 100px;

  background-color: #232323;
  margin-top: 80px;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const StCommentInput = styled.input`
  width: 430px;
  height: 40px;

  border: none;
  outline: none;
  background-color: #232323;
  border-bottom: 2px solid gray;

  color: #d7d7d7;
`;

const StCommentBtn = styled.button`
  margin-left: 20px;
  width: 80px;
  height: 40px;
  background-color: #333;
  color: #cacaca;

  &:hover {
    background-color: #161616;
    transition: 0.5s;
  }
`;
const StUserCommentWrap = styled.div`
  width: 600px;
  margin: 20px auto;

  
`;

export default KeywordChat;
