import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.footer`
  text-align: center;
  color: ${colors.main};
  padding: 20px;
`;

export const Copyright = styled.p`
  font-weight: bold;
`;

export const SocialMedia = styled.div`
  margin-top: 10px;

  a {
    margin: 0 10px;
    color: ${colors.main};
    transition: .5s;

    &:hover {
      color: ${colors.mainHover};
    }
  }
`;
