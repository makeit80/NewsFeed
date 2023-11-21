import { BrowserRouter, Route, Routes } from "react-router-dom"
import Keyword from "../pages/Keyword";
import Home from "../pages/Home";
import User from "../pages/User";
import GlobalStyle from "../GlobalStyle"


const Router = () => {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="Keyword/:id" element={<Keyword />}></Route>
                    <Route path="User/:id" element={<User />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default Router;

