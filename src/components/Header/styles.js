import styled from 'styled-components';
import { colors, screen, fontSizes } from '../../styles';
import { ReactComponent as originalLogo } from '../../assets/logo-lets-find-the-cat.svg';

export const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background: ${colors.headerBg};
  padding: 15px 15%;

  ${screen('max', 'sm')`
    padding: 10px 10%;
  `}
`;

export const Logo = styled(originalLogo)`
  width: 150px;
  min-width: 150px;
  max-width: 150px;

  ${screen('max', 'sm')`
    width: 100px;
    min-width: 100px;
    max-width: 100px;
  `}
`;

export const LoginFormContainer = styled.div`
  p {
    font-size: ${fontSizes.small};
    font-weight: bold;
    color: ${colors.secondary};
    margin-left: 5px;
  }
`;

export const OpenLoginModalBtn = styled.button`
  margin-left: 5px;
  padding: 0 10px;
  height: 30px;
  border-radius: 8px;
  background: transparent;
  border: 2px solid ${colors.secondary};
  color: ${colors.secondary};
  font-size: ${fontSizes.small};
  font-weight: bold;
  cursor: pointer;
  transition: .5s;

  &:hover {
    border: 2px solid ${colors.primary};
    color: ${colors.primary};
  }
`;
