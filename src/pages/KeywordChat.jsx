import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from 'redux/modules/comments';
import keywordData from 'redux/modules/keywordData';
import styled from 'styled-components';

function KeywordChat() {
  const param = useParams();
  console.log(param.id);

  const [comment, setComment] = useState();

  const comments = useSelector((state) => state.comments);
  console.log(comments);

  const newComment = {
    comment: comment
  };

  const dispatch = useDispatch();

  return (
    <Stbackground>
      <Stdiv>
        <span>키워드 : </span>
        <span>{param.id}</span>
      </Stdiv>
      <StForm
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(addComment(newComment));
          setComment('');
        }}
      >
        <StCommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
        <StCommentBtn type="submit">입력</StCommentBtn>
      </StForm>
      <div>
        {comments.map((item) => (
          <StCommentBox>
            <span>{item.comment}</span>
            <br />
            <button>수정</button>
            <button>삭제</button>
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
