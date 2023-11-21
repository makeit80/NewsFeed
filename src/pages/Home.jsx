import axios from 'axios';
import React, { useEffect } from 'react'

// https://cors-anywhere.herokuapp.com/corsdemo

function Home() {
  useEffect(() => {
    const cheerio = require('cheerio');
    const getRss = async () => {
      try {
        return await axios.get(`https://cors-anywhere.herokuapp.com/https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR`)
      } catch (error) {
        console.log(error)
      }
    }
    getRss()
    .then(html => {
      const $ = cheerio.load(html.data)
      let keyword = [];
      let date = [];
      let traffic = [];
      let title = [];
      let source = []; 
  
      $('item').each((i, el) => {
        keyword.push($(el).find('title').text())
        date.push($(el).find('pubDate').text())
        traffic.push($(el).children('ht\\:approx_traffic').text())
      })
      
      $('ht\\:news_item').each((i, el) => {
        title.push($(el).find('ht\\:news_item_title').text())
        source.push($(el).find('ht\\:news_item_source').text())
      })
      console.log(keyword)
  
    })
    .then(res => {
      console.log(res)
    });
  }, [])
  





  return (
    <>
      <div>Dev브랜치입니다!!</div>
    </>

  )
}

export default Home;