import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}

:root{
    --color-dark-blue:#34558B;
    --color-bright-blue:#658DC6;
    --color-gray-blue: #B6CADA;
    --color-gray:#84898C;
    --color-choco:#A58D7F;
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
`;


export default GlobalStyle;