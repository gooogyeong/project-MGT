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

  body {
    margin: 0px;
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
    font-family: inherit;

    &:focus {
      outline: none;
    }
  }

  textarea {
    font-family: inherit;
    border: none;
    resize: none;

    &:focus {
      outline: none;
    }
  }

  img, div {
    //user-drag: none;
    //user-select: none;
    //-moz-user-select: none;
    //-webkit-user-drag: none;
    //-webkit-user-select: none;
    //-ms-user-select: none;
  }

  .ProseMirror, .content__text, .intro-wrapper {
    span {
      overflow-wrap: break-word;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      th, td {
        min-width: 1em;
        border: 1px solid black;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        p, span {
          overflow-wrap: break-word;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }
    }
  }
`

export default GlobalStyle
