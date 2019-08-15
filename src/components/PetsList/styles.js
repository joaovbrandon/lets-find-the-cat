import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  text-align: center;
`;

export const Fallback = styled.h2`
  font-size: ${fontSizes.medium};
  color: ${colors.secondary};
  font-weight: normal;
`;
