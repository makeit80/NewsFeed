import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from 'GlobalStyle';
import Home from '../pages/Home';
import Keyword from '../pages/Keyword';
import KeywordChat from '../pages/KeywordChat';
import Mypage from '../pages/Mypage';
import Signup from '../pages/SignUp';
import App from '../App';

const Router = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="keyword/:id" element={<Keyword />} />
            <Route path="keywordchat/:id" element={<KeywordChat />} />
            <Route path="mypage/:id" element={<Mypage />} />
            <Route path="signup/" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
