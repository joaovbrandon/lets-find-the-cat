import styled from 'styled-components';
import { colors, screen } from '../../styles';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: ${colors.primary};
  padding: 30px 15%;

  ${screen('max', 'sm')`
    padding: 30px 10% 20px 10%;
  `}
`;
