import { createGlobalStyle } from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html,body,#root {
    height: 100%;
  }
  body{
    background: #fff /* #3B67B7 #4192D4 */;
  }
  body, input, button {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: Arial, Helvetica, sans-serif;
    color: #222;
    font-size: 14px;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
