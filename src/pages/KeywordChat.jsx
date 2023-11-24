import { db } from 'api/firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment, getComment } from 'redux/modules/comments';
import styled from 'styled-components';

function KeywordChat() {
  const param = useParams();
  console.log(param.id);

  const [text, setText] = useState('');

  const comments = useSelector((state) => state.comments);
  const filterComments = comments.filter((comment) => comment.keyword === param.id);
  console.log(comments);

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
      });
      dispatch(getComment(initialComments));
    };
    fetchData();
  }, []);

  const newComment = {
    text,
    keyword: param.id,
    id: Date.now()
  };

  const addCommenthandler = (e) => {
    e.preventDefault();

    dispatch(addComment(newComment));
    setText('');

    addDoc(collection(db, 'comments'), newComment);
  };

  return (
    <Stbackground>
      <Stdiv>
        <span>키워드 : </span>
        <span>{param.id}</span>
      </Stdiv>
      <StForm onSubmit={addCommenthandler}>
        <StCommentInput value={text} onChange={(e) => setText(e.target.value)} />
        <StCommentBtn type="submit">입력</StCommentBtn>
      </StForm>
      <div>
        {filterComments &&
          filterComments.map((item) => (
            <StCommentBox key={item.id}>
              <div>
                <p>{item.text}</p>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </StCommentBox>
          ))}
      </div>
    </Stbackground>
  );
}

const Stbackground = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 80px;
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
  margin: 0 auto;
  background-color: #eee;
`;

const StCommentInput = styled.input`
  width: 400px;
  height: 40px;
  margin-left: 50px;
  margin-top: 25px;
`;

const StCommentBtn = styled.button`
  margin-left: 20px;
  width: 60px;
  height: 40px;
  background-color: #333;
  color: #fff;
`;

const StCommentBox = styled.div`
  width: 600px;
  height: auto;
  margin: 20px auto;
  padding: 20px;
  border-radius: 20px 20px 20px 0;
  border: 1px solid #000;
  word-break: break-all;
`;

export default KeywordChat;
