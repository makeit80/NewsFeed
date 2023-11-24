import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function KeywordNews() {
    const location = useLocation();
    //전달받은 키워드
    const keyword = location.state;
    const keywordData = useSelector((state) => state.keywordData.value);
    const filterNews = keywordData.filter((data) => data.keyword === keyword);
    const { date, link, source, title } = filterNews[0];
    console.log(link, title);
    return (
        <div>
            <h3>{title}</h3>
            <a href={link}>기사 링크</a>
        </div>
    );
}

