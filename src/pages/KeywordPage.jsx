import { getCommentsOnKeyword } from 'api/comments.api';
import { db } from 'api/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from 'redux/modules/comments';
import styled from 'styled-components';

function KeywordChat() {
  const params = useParams();
  const keyword = params.keyword;
  const [commentsOnKeyword, setCommentsOnKeyword] = useState([]);
  const [text, setText] = useState('');
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const newComment = {
    userImage: userData.photoURL,
    text,
    keyword: params.id,
    id: Date.now(),
    userName: userData.displayName
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

  useEffect(() => {
    getCommentsOnKeyword(keyword).then((data) => setCommentsOnKeyword(data));
  }, [keyword]);

  return (
    <>
      <Stbackground>
        {/* <KeywordNews /> */}
        <h1 style={{ fontSize: 32 }}>{keyword}</h1>
        <StForm onSubmit={addCommenthandler}>
          <StCommentInput value={text} onChange={(e) => setText(e.target.value)} />
          <StCommentBtn type="submit">입력</StCommentBtn>
        </StForm>
        <div>
          {commentsOnKeyword &&
            commentsOnKeyword.map((item) => (
              <StUserCommentWrap>
                <div>
                  <StProfile src={item.userImage} />
                  <p style={{ float: 'right', lineHeight: '50px' }}>{item.userName}</p>
                </div>
                <StCommentBox>
                  <div key={item.id}>
                    <p>{item.text}</p>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </StCommentBox>
              </StUserCommentWrap>
            ))}
        </div>
      </Stbackground>
    </>
  );
}

const Stbackground = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 80px;
`;

// const Stdiv = styled.div`
//   text-align: center;
//   margin: 20px auto;
//   background-color: #eee;
//   width: 400px;
//   height: 50px;
//   line-height: 50px;
// `;

const StForm = styled.form`
  width: 600px;
  height: 100px;
  margin: 2rem auto;
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
const StUserCommentWrap = styled.div`
  width: 600px;
  height: auto;
  margin: 20px auto;
`;
const StProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const StCommentBox = styled.div`
  padding: 20px;
  border-radius: 20px 20px 20px 0;
  border: 1px solid #000;
  word-break: break-all;
`;

export default KeywordChat;
