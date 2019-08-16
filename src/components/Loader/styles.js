import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: visibility .6s, opacity .3s linear;

  ${({ isLoading, loaderStyle }) => {
    if (isLoading || loaderStyle === 'spin') {
      return `
      opacity: 1;
      visibility: visible;
      `;
    }

    return `
    opacity: 0;
    visibility: hidden;
    `;
  }}

  ${({ loaderStyle }) => {
    if (loaderStyle === 'spin') {
      return `
        color: ${colors.primary};
        margin-top: 20px;
      `;
    }

    return `
      position: fixed;
      background: ${colors.loaderBg};
      color: ${colors.white};
    `;
  }}
`;

export const Message = styled.span`
  font-size: ${fontSizes.small};
  font-weight: bold;
  margin-top: 5px;
  pointer-events: none;
`;
