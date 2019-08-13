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

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s;
  color: ${colors.secondary};

  &:hover {
    color: ${colors.tertiary};
  }

  ${screen('max', 'sm')`
    cursor: pointer;
  `}
`;

export const UserAvatar = styled.img`
  border-radius: 50%;
  max-width: 60px;
  margin-right: 10px;
  position: relative;

  ${screen('max', 'sm')`
    max-width: 50px;
  `};
`;

export const UserInfos = styled.div`
  display: flex;
  flex-direction: column;

  ${screen('max', 'sm')`
    display: ${({ mobileMenuOpened }) => {
    if (mobileMenuOpened) return 'flex';
    return 'none';
  }};
    position: absolute;
    top: 70px;
    right: 10%;
    background: ${colors.background};
    border: 1px solid ${colors.primary};
    border-radius: 10px;
    padding: 5px 10px;
    -webkit-box-shadow: -2px 40px 10px 0px ${colors.mobileMenuShadow};
    -moz-box-shadow: -2px 40px 10px 0px ${colors.mobileMenuShadow};
    box-shadow: -2px 0px 10px 0px ${colors.mobileMenuShadow};
  `}
`;

export const UserName = styled.span`
  color: ${colors.primary};
  font-size: ${fontSizes.regular};
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  text-align: right;
  color: ${colors.secondary};
  font-size: ${fontSizes.smaller};
  cursor: pointer;
  transition: all .2s;

  &:hover {
    color: ${colors.tertiary};
    text-decoration: underline;
  }

  ${screen('max', 'sm')`
    text-align: center;
    font-size: ${fontSizes.small};
    margin: 5px 0;
  `}
`;

export const MobileMenuOpacity = styled.div`
  background: 'transparent';
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
