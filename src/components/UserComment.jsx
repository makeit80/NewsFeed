import { db } from 'api/firebase';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, switchComment } from 'redux/modules/comments';
import styled from 'styled-components';

function UserComment({ comments, children: { docId, userImage, text, keyword, id, userName, isUpdate } }) {
  // 여기는 하나하나의 comment 영역
  // 그르니까 여기에서 수정은 이놈에 대한 수정이다.
  // 여기서 dispatch를 이용해서 업데이트 치면된다.

  const [updateText, setUpdateText] = useState(text);

  const dispatch = useDispatch();

  const updateCommentHandler = (id) => {
    const newComment = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, isUpdate: true };
      }
      return { ...comment };
    });
    dispatch(switchComment(newComment));
  };

  const completeCommentHandler = async (id) => {
    const q = query(collection(db, 'comments'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    let ref = '';
    querySnapshot.forEach((doc) => {
      ref = doc.ref;
    });

    await updateDoc(ref, { text: updateText });

    const newUpdateComment = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, isUpdate: false, text: updateText };
      }
      return { ...comment };
    });
    dispatch(switchComment(newUpdateComment));
  };

  const deleteBtn = async (id) => {
    // 진호 체고,,,
    if (window.confirm('삭제하시겠습니까?')) {
      const Ref = doc(db, 'comments', docId + '');
      try {
        await deleteDoc(Ref);
      } catch (err) {
        console.error('error occurred while delete post');
        console.error(err);
      }
      const filteredComment = comments.filter((comment) => {
        return id !== comment.id;
      });
      dispatch(deleteComment(filteredComment));
    } else {
      return alert('취소되었습니다');
    }
  };

  return (
    <>
      <div>
        <StProfile src={userImage} />
        <p style={{ float: 'right', lineHeight: '50px' }}>{userName}</p>
      </div>
      <StCommentBox key={id}>
        <div>
          {!isUpdate ? (
            <>
              <p>{text}</p>
              <button
                onClick={() => {
                  updateCommentHandler(id);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  deleteBtn(id);
                }}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <input
                value={updateText}
                onChange={(e) => {
                  setUpdateText(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  completeCommentHandler(id);
                }}
              >
                완료
              </button>
              <button
                onClick={() => {
                  deleteBtn(id);
                }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </StCommentBox>
    </>
  );
}

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

export default UserComment;
