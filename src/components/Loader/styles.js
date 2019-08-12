import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  display: flex;
  background: ${colors.loaderBg};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  text-align: center;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  visibility: ${({ isLoading }) => (isLoading ? 'visible' : 'hidden')};
  opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
  transition: visibility .6s, opacity .3s linear;
`;

export const Message = styled.span`
  font-size: ${fontSizes.small};
  font-weight: bold;
  margin-top: 5px;
  pointer-events: none;
`;
