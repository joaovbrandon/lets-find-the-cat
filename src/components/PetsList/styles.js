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
  flex-wrap: wrap;
  width: 100%;
  margin: 0 3% 20px 3%;
  z-index: 9996;

  ${screen('max', 'lg')`
  margin: 0 4% 20px 4%;
  `}

  ${screen('max', 'sm')`
  margin: 0 .5% 20px .5%;
  flex-direction: column;
  `}
`;

export const ExcludeFoundPetsFilter = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.secondary};
  width: 100%;
  cursor: pointer;
  transition: .2s all;
  margin-top: 10px;

  &:hover {
    color: ${colors.primary};
  }
`;

export const Fallback = styled.h2`
  font-size: ${fontSizes.medium};
  color: ${colors.secondary};
  font-weight: normal;
`;
