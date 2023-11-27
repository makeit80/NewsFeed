import { db } from 'api/firebase';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, switchComment } from 'redux/modules/comments';
import styled from 'styled-components';

function UserComment({ comments, children: { docId, userImage, text, keyword, id, userName, date, isUpdate } }) {
  // 여기는 하나하나의 comment 영역
  // 그르니까 여기에서 수정은 이놈에 대한 수정이다.
  // 여기서 dispatch를 이용해서 업데이트 치면된다.

  const [updateText, setUpdateText] = useState(text);

  const dispatch = useDispatch();

  const updateCommentHandler = (id) => {
    const newComment = comments.map((comment) => {
      if (comment.docId === docId) {
        return { ...comment, isUpdate: true };
      }
      return { ...comment };
    });
    dispatch(switchComment(newComment));
  };

  const completeCommentHandler = async (id) => {
    const Ref = doc(db, 'comments', docId + '');
    try {
      await updateDoc(Ref, { text: updateText });
    } catch (err) {
      console.error('error occurred while update post');
      console.error(err);
    }
    // const q = query(collection(db, 'comments'), where('id', '==', id));
    // const querySnapshot = await getDocs(q);
    // let ref = '';
    // querySnapshot.forEach((doc) => {
    //   ref = doc.ref;
    // });

    // await updateDoc(ref, { text: updateText });

    const newUpdateComment = comments.map((comment) => {
      console.log('comment.docId ====> ', comment.docId);
      if (comment.docId === docId) {
        return { ...comment, isUpdate: false, text: updateText };
      }
      return { ...comment };
    });
    dispatch(switchComment(newUpdateComment));
  };

  const deleteBtn = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const Ref = doc(db, 'comments', docId + '');
      try {
        await deleteDoc(Ref);
      } catch (err) {
        console.error('error occurred while delete post');
        console.error(err);
      }
      const filteredComment = comments.filter((comment) => {
        return docId !== comment.docId;
      });
      dispatch(deleteComment(filteredComment));
    } else {
      return alert('취소되었습니다');
    }
  };

  return (
    <StDiv>
      <StWrapper>
        <StProfile src={userImage} />
        <StSpan $right={'56%'} $top={'22%'}>
          {userName}
        </StSpan>

        <StSpan $right={'2%'} $top={'53%'}>
          {date}
        </StSpan>
      </StWrapper>
      <StCommentBox key={id}>
        <div>
          {!isUpdate ? (
            <>
              <p>{text}</p>
              <StButton
                onClick={() => {
                  updateCommentHandler(id);
                }}
                $right={'8%'}
                $top={'31%'}
                $backgroundColor={'#232323'}
              >
                수정
              </StButton>
              <StButton
                onClick={() => {
                  deleteBtn(id);
                }}
                $right={'3%'}
                $top={'35%'}
                $backgroundColor={'transparent'}
              >
                X
              </StButton>
            </>
          ) : (
            <>
              <input
                value={updateText}
                onChange={(e) => {
                  setUpdateText(e.target.value);
                }}
              />
              <StButton
                onClick={() => {
                  completeCommentHandler(id);
                }}
                $right={'10%'}
                $top={'31%'}
                $backgroundColor={'#232323'}
              >
                완료
              </StButton>
              <StButton
                onClick={() => {
                  deleteBtn(id);
                }}
                $right={'5%'}
                $top={'35%'}
                $backgroundColor={'transparent'}
              >
                X
              </StButton>
            </>
          )}
        </div>
      </StCommentBox>
    </StDiv>
  );
}
const StDiv = styled.div`
  margin-bottom: 50px;
`;
const StWrapper = styled.div`
  position: relative;
`;
const StProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const StSpan = styled.span`
  color: #d7d7d7;
  position: absolute;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  text-align: left;
  width: 200px;
`;
const StCommentBox = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 20px 20px 20px 0;
  color: #fff;
  border: 1px solid #fff;
  word-break: break-all;
  background-color: #232323;
  color: #d7d7d7;
`;
const StButton = styled.button`
  border: none;
  background-color: ${(props) => props.$backgroundColor};

  position: absolute;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};

  color: #d7d7d7;
  font-weight: bold;

  &:hover {
    color: gray;
    transition: 0.5s;
  }
`;

export default UserComment;
