import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom'



export default function KeywordNews() {
    const location = useLocation();
    const params = useParams();
    const keyword = params.id;
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
  background-color: #353535;

  display:flex;
  justify-content: space-around;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  font-size:1.2rem;
  text-align: center;
  line-height: 50px;
  color: white;

  margin: auto;
  margin-top: 70px;
`;

const LinkItem = styled(Link)`
color: white;
border: none;
`

const NewsArticle = styled.article`
    width: 800px;
    height: 400px;
    background-color: #353535;
    display:flex;
    flex-direction: column;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    margin:auto;
    padding:1rem;
    color: white;

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
