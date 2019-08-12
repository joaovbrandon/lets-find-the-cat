import styled from 'styled-components';
import { colors, screen, fontSizes } from '../../styles';
import { ReactComponent as originalCat404 } from '../../assets/cat-404.svg';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: ${colors.primary};
  padding: 30px 0;

  a {
    font-size: ${fontSizes.medium};
    color: ${colors.primary};
  }
`;

export const Cat404 = styled(originalCat404)`
  max-width: 600px;
  margin: 40px 0;

  ${screen('max', 'sm')`
    max-width: 50%;
  `}
`;
