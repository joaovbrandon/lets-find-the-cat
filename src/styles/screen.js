import { css } from 'styled-components';
import { breakpoints } from './variables';

const screen = (minOrMax, breakpoint) => {
  if (minOrMax !== 'min' && minOrMax !== 'max') {
    throw new Error("You should pass 'min' or 'max' to the first parameter of screen(minOrMax, breakpoint)");
  }

  if (!(breakpoint in breakpoints)) {
    throw new Error(`You should pass a valid breakpoint to the second parameter of screen(minOrMax, breakpoint)\nThe breakpoints are: ${JSON.stringify(breakpoints)}`);
  }

  return Object.keys(breakpoints).reduce((accumulator, size) => {
    accumulator[size] = (...args) => css`
      @media (${minOrMax}-width: calc(${breakpoints[size]}px - 1px)) {
        ${css(...args)};
      }
    `;

    return accumulator;
  }, {})[breakpoint];
};

export default screen;
