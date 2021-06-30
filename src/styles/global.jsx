import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        color: white;

        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    
    body {
        background-color: #232323;

        & #root {
            overflow-x: hidden;
            min-height: 100vh;
        }

        & ul {
            list-style: none;
        }

        & a {
            text-decoration: none;
            cursor: pointer;
        }
    }
`;

export default GlobalStyles;