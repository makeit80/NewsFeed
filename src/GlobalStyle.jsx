import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}

body{
    width:100vw;
    height: 100vh;
}

#root{
    width:100%;
    height: 100%;
}

button{
    border: none;
    outline: none;
}
`


export default GlobalStyle;