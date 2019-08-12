import styled from 'styled-components';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  text-align: center;
  z-index: 9998;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  opacity: ${({ opened }) => (opened ? '1' : '0')};
  transition: visibility .4s, opacity .2s linear;
`;

export const Opacity = styled.div`
  background: ${colors.backgroundOpacity};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Content = styled.div`
  background: ${colors.background};
  border-radius: 10px;
  position: relative;
  padding: 50px;

  ${screen('max', 'sm')`
    padding: 35px 20px;
  `}

  h2 {
    color: ${colors.primary};
    margin: -10px 0 20px 0;
  }

  p {
    color: ${colors.secondary};
    margin: -20px 0 20px 0;
  }
`;

export const Close = styled.span`
  color: ${colors.primary};
  position: absolute;
  top: 0;
  right: 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSizes.bigger};
`;
