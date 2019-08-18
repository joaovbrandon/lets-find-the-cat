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
  padding: 10px;
  transition: visibility .4s, opacity .2s linear;

  ${({ opened }) => {
    if (opened) {
      return `
        visibility: visible;
        opacity: 1;
      `;
    }

    return `
      visibility: hidden;
      opacity: 0;
    `;
  }}

  ${screen('max', 'sm')`
  padding: 0;
  `}
`;

export const Opacity = styled.div`
  background: ${colors.backgroundOpacity};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ${screen('max', 'sm')`
  background: ${colors.white}
  `}
`;

export const Content = styled.div`
  background: ${colors.background};
  border-radius: 10px;
  position: relative;
  padding: 0 20px;
  min-width: 270px;
  max-height: 90%;
  word-break: break-word;
  overflow: scroll;

  ${({ maxWidth }) => `max-width: ${maxWidth}`}

  h2 {
    color: ${colors.primary};
    margin: -10px 0 20px 0;
  }

  p {
    color: ${colors.secondary};
    margin: -20px 0 20px 0;
  }

  ${screen('max', 'sm')`
  border-radius: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  margin: 0;
  `}
`;

export const Close = styled.span`
  color: ${colors.primary};
  position: sticky;
  top: 0;
  margin-right: -100%;
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSizes.bigger};

  ${screen('max', 'sm')`
  font-size: ${fontSizes.gigantic};
  `}
`;
