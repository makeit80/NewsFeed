import GlobalStyle from 'GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import KeywordPage from '../pages/KeywordPage';
import Mypage from '../pages/Mypage';
import ProtectedRoute from '../pages/ProtectedRoute';
import SignUpPage from '../pages/SignUpPage';

const Router = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomePage />} />
            <Route path="keywords/:keyword" element={<KeywordPage />} />
            <Route
              path="mypage/:id"
              element={
                <ProtectedRoute requireUser>
                  <Mypage />
                </ProtectedRoute>
              }
            />
            <Route
              path="signup/"
              element={
                <ProtectedRoute requireUser={false}>
                  <SignUpPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
