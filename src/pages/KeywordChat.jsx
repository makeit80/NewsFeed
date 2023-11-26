import { db } from 'api/firebase';
import KeywordNews from 'components/KeywordNews';
import UserComment from 'components/UserComment';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment, getComment, switchComment, updateComment } from 'redux/modules/comments';
import styled from 'styled-components';

function KeywordChat() {
  const param = useParams();

  const [text, setText] = useState('');

  const comments = useSelector((state) => state.comments);

  const userData = useSelector((state) => state.userData);

  const filterComments = comments.filter((comment) => comment.keyword === param.id);

  const [updateComments, setUpdateComments] = useState([...comments]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'comments'));
      const querySnapshot = await getDocs(q);

      const initialComments = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        console.log('data', data);
        initialComments.push(data);
        console.log(initialComments);
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
  const [isCommentUpdate, setIsCommentUpdate] = useState(false);

  const deleteBtn = (id) => {
    console.log(id);
  };

  return (
    <Stbackground>
      <KeywordNews />
      <StForm onSubmit={addCommenthandler}>
        <StCommentInput required value={text} onChange={(e) => setText(e.target.value)} placeholder='댓글을 남겨주세요' />
        <StCommentBtn type="submit">입력</StCommentBtn>
      </StForm>
      <div>
        {filterComments &&
          filterComments.map((item) => (
            <StUserCommentWrap>
              <UserComment
                comments={comments}
                handler={{
                  deleteBtn
                }}
              >
                {item}
              </UserComment>
            </StUserCommentWrap>
          ))}
      </div>
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
  text-align: center;
  margin: 20px auto;
  background-color: #eee;
  width: 400px;
  height: 50px;
  line-height: 50px;
`;

const StForm = styled.form`
  width: 600px;
  height: 100px;

  background-color: #515151;
  margin-top: 80px;
  color: white;
`;

const StCommentInput = styled.input`
  width: 400px;
  height: 40px;

  margin-left: 50px;
  margin-top: 25px;

  border: none;
  outline: none;
  background-color: gray;

  color: white;
`;

const StCommentBtn = styled.button`
  margin-left: 20px;
  width: 60px;
  height: 40px;
  background-color: #333;
  color: #fff;
`;
const StUserCommentWrap = styled.div`
  width: 600px;
  height: auto;
  margin: 20px auto;
`;

export default KeywordChat;
