import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from 'GlobalStyle';
import Home from '../pages/Home';
import Keyword from '../pages/Keyword';
import KeywordChat from '../pages/KeywordChat';
import Mypage from '../pages/Mypage';
import Signup from '../pages/SignUp';
import App from '../App';
import ProtectedRoute from '../pages/ProtectedRoute';
import { useSelector } from 'react-redux';

const Router = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="keyword/:keyword" element={<KeywordChat />} />
            <Route path="mypage/:id" element={<ProtectedRoute requireUser><Mypage /> </ProtectedRoute>} />
            <Route path="signup/" element={<ProtectedRoute requireUser={false}><Signup /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
