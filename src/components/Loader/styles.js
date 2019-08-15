import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  display: flex;
  background: ${({ loaderStyle }) => {
    if (loaderStyle === 'spin') return 'transparent';
    return colors.loaderBg;
  }};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: ${({ loaderStyle }) => {
    if (loaderStyle === 'spin') return 'initial';
    return 'fixed';
  }};
  text-align: center;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: ${({ loaderStyle }) => {
    if (loaderStyle === 'spin') return '20px';
    return '0';
  }};
  color: ${({ loaderStyle }) => {
    if (loaderStyle === 'spin') return colors.primary;
    return colors.white;
  }};
  visibility: ${({ isLoading, loaderStyle }) => {
    if (isLoading || loaderStyle === 'spin') return 'visible';
    return 'hidden';
  }};
  opacity: ${({ isLoading, loaderStyle }) => {
    if (isLoading || loaderStyle === 'spin') return '1';
    return '0';
  }};
  transition: visibility .6s, opacity .3s linear;
`;

export const Message = styled.span`
  font-size: ${fontSizes.small};
  font-weight: bold;
  margin-top: 5px;
  pointer-events: none;
`;
