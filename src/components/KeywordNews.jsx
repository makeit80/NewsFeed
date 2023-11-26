import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'



export default function KeywordNews() {
    const location = useLocation();
    const params = useParams();

    const keyword = params.keyword
    const keywordList = location.state.keywordList.value;
    const keywordRank = keywordList.findIndex((data) => data.keyword === keyword);
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
                    <span>{keywordRank + 1}위</span>
                </div>
            </Stdiv>

            <NewsArticle>
                <header>
                    <Source>{source}</Source>
                    <h1>{title}</h1>
                </header>
                <div></div>
                <p>{content}</p>
                <Link to={link}><Url>더보기...</Url></Link>
            </NewsArticle>
        </>
    );
}

const Stdiv = styled.div`
  width: 60%;
  height: 50px;
  display:flex;
  justify-content: space-around;
  font-size:1.2rem;
  text-align: center;
  margin: auto;
  margin-top:1.5rem;
  background-color: #eee;
  line-height: 50px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;


const NewsArticle = styled.article`
    width:60%;
    height:50%;
    background-color: #eee;
    display:flex;
    flex-direction: column;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    margin:auto;
    padding:1rem;

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
    }

`;

const Source = styled.p`
    text-align:end;
`

const Url = styled.p`
    margin-left:0.5rem;
`
