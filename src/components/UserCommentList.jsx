import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';


export default function UserCommentList() {
  const userData = useSelector((state) => state.userData);
  let comments = useSelector((state) => state.comments);
  // console.log(comments);
  // if (comments.length) localStorage.setItem('comments', JSON.stringify(comments))
  // else comments = JSON.parse(localStorage.getItem('comments'));

  //리렌더링 시 유저 데이터는 잘 받아와지는데 댓글들 리스트가 제대로 안가져와짐.
  //댓글을 추가할 때 또 리스트에 잘 나옴.. 뭐가 문제냐,, 추가할 때 마다 값을 리턴하잖슴.. 
  //근데 새로고침하면 따로 리턴을 안해서 그런것 같슴. s
  const filterComments = comments.filter(comment => comment.userId === userData.uid);

  return (
    <>
      {
        filterComments.map(comment => {
          const { keyword, text, date } = comment;
          return (
            <StLi key={date} >
              <StSpan>키워드  {keyword}</StSpan>
              <StP>내용  {text}</StP>
              <StTime> {date}</StTime>
            </StLi>
          );
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

