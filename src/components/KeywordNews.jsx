import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'



export default function KeywordNews() {
    const location = useLocation();
    const params = useParams();
    const keyword = params.id;
    const keywordList = location.state.keywordList.value;
    //전체 키워드 뉴스 중에 해당하는 기사 위치 찾기
    let findKeywordNews = keywordList.findIndex((data) => data.keyword === keyword);
    //해당 키워드 기사의 날짜와 일치한 기사 위치 찾기
    const findDate = keywordList.findIndex(data => JSON.stringify(data.date) === JSON.stringify(keywordList[findKeywordNews].date));
    //날짜에 해당하는 키워드 순위
    const keywordRank = findKeywordNews - findDate + 1;

    let { title, content, link, source, traffic } = keywordList[keywordRank];
    content = content.replace(/&#39;|&nbsp;/g, '');
    return (
        <>
            <Stdiv>
                <div>
                    <span>키워드 : </span>
                    <span>{keyword}</span>
                </div>
                <div>
                    <span>검색 횟수 : </span>
                    <span>{traffic}</span>
                </div>
                <div>
                    <span>검색 순위 : </span>
                    <span>{keywordRank}위</span>
                </div>
            </Stdiv>

            <NewsArticle>
                <header>
                    <h1>{title}</h1>
                </header>
                <div></div>
                <p>{content}</p>
                <LinkItem to={link}><Url>더보기...</Url></LinkItem>
                <Source>{source}</Source>

            </NewsArticle>
        </>
    );
}

const Stdiv = styled.div`
  width: 800px;
  height: 50px;
  background-color: #232323;

  display:flex;
  justify-content: space-around;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  font-size:1.2rem;
  text-align: center;
  line-height: 50px;
  color: #dddddd;

  margin: auto;
  margin-top: 70px;
  padding-top: 15px;
`;

const LinkItem = styled(Link)`
width: 150px;
color: #c0c0c0;
border: none;
`

const NewsArticle = styled.article`
    width: 800px;
    height: 400px;
    background-color: #232323;
    display:flex;
    flex-direction: column;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    margin:auto;
    padding:1rem;
    color: #dddddd;

    header{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }

    h1{
        font-size:2rem;
        padding:0.5rem;
        padding:0.5rem 2rem;
    }

    div{
        border:1px solid var(--color-gray);
        margin:1rem;
    }

    p{
        padding:0.5rem 1rem;
        letter-spacing: 1.5px;
        line-height: 50px;

    }

`;

const Source = styled.p`
    text-align:end;
`

const Url = styled.p`
    margin-left:0.5rem;
`
