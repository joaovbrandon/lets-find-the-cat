import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import screen from './screen';
import { fontSizes } from './variables';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    line-height: 1.5;

    ${screen('max', 'md')`
      font-size: calc(12px + .4vw);
    `}
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-size: ${fontSizes.regular};
    -webkit-tap-highlight-color: transparent !important;
    -webkit-touch-callout: none !important;
  }

  body {
    background: ${colors.background};
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: ${fontSizes.regular};
  }

  h1 { font-size: ${fontSizes.huge}; }

  h2 { font-size: ${fontSizes.bigger}; }

  h3 { font-size: ${fontSizes.big}; }

  h4 { font-size: ${fontSizes.medium}; }

  h5 { font-size: ${fontSizes.regular}; }

  h6 { font-size: ${fontSizes.small}; }

  p { font-size: ${fontSizes.regular}; }

  a { font-size: ${fontSizes.regular}; }
`;

export default GlobalStyle;
