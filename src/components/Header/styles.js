import styled from 'styled-components';
import { colors, screen, fontSizes } from '../../styles';
import { ReactComponent as originalLogo } from '../../assets/logo-lets-find-the-cat.svg';
import userFallback from '../../assets/user-fallback.png';

export const Container = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background: ${colors.headerBg};
  padding: 15px 15%;
  z-index: 9997;

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
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  margin-right: 10px;
  position: relative;
  background-color: ${colors.imgFallback};
  background: url(${userFallback});
  background-size: cover;

  ${screen('max', 'sm')`
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  `};
`;

export const UserInfos = styled.div`
  display: flex;
  flex-direction: column;

  ${screen('max', 'sm')`
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

  ${({ mobileMenuOpened }) => {
    if (mobileMenuOpened) return 'display: flex;';
    return 'display: none;';
  }}
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
  font-size: ${fontSizes.regular};
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
