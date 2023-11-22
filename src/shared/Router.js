import { BrowserRouter, Route, Routes } from "react-router-dom"
import Keyword from "../pages/Keyword";
import Home from "../pages/Home";
import Mypage from "pages/Mypage";
import GlobalStyle from "../GlobalStyle"



const Router = () => {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="keyword/:id" element={<Keyword />}></Route>
                    <Route path="mypage/:id" element={<Mypage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default Router;

