import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.black};
  line-height: 1.8;

  a {
    color: ${colors.darkGrey};
  }
`;
