import styled from 'styled-components';
import { colors, screen, fontSizes } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: ${colors.main};
  padding: 30px 0;

  svg {
    max-width: 600px;
    margin: 40px 0;

    ${screen('max', 'sm')`
      max-width: 50%;
    `}
  }

  a {
    font-size: ${fontSizes.medium};
    color: ${colors.main};
  }
`;
