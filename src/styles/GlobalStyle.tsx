import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
font-size: 10px;
font-family: 'Noto Serif KR', sans-serif;
}

button {
border: none;
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
