import styled from 'styled-components';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.section`
  text-align: center;
  color: ${colors.primary};
`;

export const Info = styled.h2`
  font-size: ${fontSizes.regular};
`;

export const Value = styled.span`
  font-size: ${fontSizes.big};

  ${screen('max', 'xs')`
    display: block;
  `}
`;

export const Fallback = styled.h3`
  font-size: ${fontSizes.regular};
  color: ${colors.secondary};
  font-weight: normal;
`;
