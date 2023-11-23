import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
box-sizing: border-box;
}

:root{
--colort-logo:#c78159;
--color-choco:#A58D7F;
--color-gray:#84898C;
}

body{
width:100vw;
height: 100vh;
overflow-x: hidden;

&::-webkit-scrollbar {
display:none;
}
}

#root{
width:100%;
height: 100%;
}

button{
border: none;
outline: none;
}

`;


export default GlobalStyle;