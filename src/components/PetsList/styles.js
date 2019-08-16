import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

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

export const Fallback = styled.h2`
  font-size: ${fontSizes.medium};
  color: ${colors.secondary};
  font-weight: normal;
`;
