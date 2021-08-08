import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
font-size: 10px;
font-family: 'Noto Serif KR', sans-serif;

// hide scrollbar
-ms-overflow-style: none; // IE, Edge
scrollbar-width: none; // Firefox
&::-webkit-scrollbar {
display: none; // Chrome, Safari, Opera
}
}

button {
cursor: pointer;
border: none;
font-family: inherit;
&:focus {
outline: none;
}
}

input {
&:focus {
outline: none;
}
}
`

export default GlobalStyle
