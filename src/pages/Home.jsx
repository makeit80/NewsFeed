import axios from 'axios';
import styled from "styled-components"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { insertData } from 'redux/modules/keywordData';


// https://cors-anywhere.herokuapp.com/corsdemo
// https://cors.bridged.cc/




function Home() {
  const keywordList = useSelector((state) => {
    return state.keywordData
  })
  const dispatch = useDispatch();

  useEffect(() => {
    const cheerio = require('cheerio');
    const getRss = async () => {
      try {
        return await axios.get(`https://cors.bridged.cc/https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR`)
      } catch (error) {
        console.log(error)
      }
    }

    getRss()
      .then(html => {
        const $ = cheerio.load(html.data)
        let keywordItem = []

        $('item').each((i, el) => {
          const Data = {
            keyword: $(el).find('title').text(),
            date: $(el).find('pubDate').text(),
            traffic: $(el).children('ht\\:approx_traffic').text(),
            title : $(el).find(':nth-child(8) > ht\\:news_item_title').text().replace(/(&#39;|&quot;)/g, ''),
            source : $(el).find(':nth-child(8) > ht\\:news_item_source').text(),
            // link : $(el).find(':nth-child(8) > ht:\\news_item_url').text()
          }
          keywordItem.push(Data)
        })
        dispatch(insertData(keywordItem))
      })
  }, [])






  return (
    <Stbody>
      <StMain>
        <StUl height={'500px'}>
          {
            keywordList.value
              .map((item, i) => {
                return (
                  <Stli>
                    <StSpan>{i + 1}위 </StSpan>
                    <StLabel>{item.keyword}</StLabel>
                    <StP width={'100px'} right={'11.5%'} top={'30%'} fontSize={'20px'} color={'black'}>{item.traffic}</StP>
                    <StP width={'50px'} right={'21.5%'} top={'38%'} fontSize={'10px'} color={'gray'}>검색횟수</StP>
                    <StP width={'50px'} right={'6.5%'} top={'38%'} fontSize={'10px'} color={'gray'}>댓글</StP>
                    {/* <StTime>{item.date}</StTime> */}
                  </Stli>
                )
              })
          }
        </StUl>
        <StUl height={'400px'}>
          
        </StUl>
      </StMain>
    </Stbody>

  )
}

const Stbody = styled.body`
width: 100vw;
height: 1000px;
min-width: 1000px;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const StMain = styled.main`


`
const StUl = styled.ul`
width: 1000px;
height: ${(props) => props.height};

display: grid;
grid-template-columns: 1fr;
grid-auto-rows: 70px;

background-color: #e3e3e3;
border-radius: 5px;

overflow: auto;
overflow-x: hidden;

margin-top: 70px;
`

const Stli = styled.li`
position: relative;
background-color: white;

border: 1px solid yellow;
border-radius: 5px;

margin: 10px;
`
const StLabel = styled.label`
position: absolute;
left: 6%;
top: 33%;

font-weight: bold;
color: #3f3f3f;
font-size: 20px;

`
const StTime = styled.time`
  
`
const StSpan = styled.span`
position: absolute;
left: 1.5%;
top: 33%;

font-weight: bold;
color: #3f3f3f;
font-size: 20px;
`
const StP = styled.p`
width: ${(props) => props.width};

position: absolute;
right: ${(props) => props.right};
top: ${(props) => props.top};

font-size: ${(props) => props.fontSize};
color: ${(props) => props.color};
text-align: left;
`


export default Home;