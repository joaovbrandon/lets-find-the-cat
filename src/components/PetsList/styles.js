import styled from 'styled-components';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  width: 100%;
  margin-bottom: 20px;
`;

export const Filters = styled.div`
  display: flex;
  width: 100%;
  margin: 0 3% 20px 3%;

  ${screen('max', 'lg')`
  margin: 0 4% 20px 4%;
  `}

  ${screen('max', 'sm')`
  margin: 0 .5% 20px .5%;
  flex-direction: column;
  `}
`;

export const Fallback = styled.h2`
  font-size: ${fontSizes.medium};
  color: ${colors.secondary};
  font-weight: normal;
`;
