import styled from 'styled-components';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const itemStyle = `
  font-size: ${fontSizes.small};
  font-weight: bold;
  color: ${colors.primary};
  cursor: pointer;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  padding: 6px;
  margin: 0 5px;
  line-height: 1;
`;

const itemStyleXS = `
  padding: 5px;
  margin: 0 3px;
`;

export const PageNumber = styled.button`
  ${itemStyle}

  ${screen('max', 'xs')`
  ${itemStyleXS}
  `}
`;

export const CurrentPage = styled.span`
  ${itemStyle}

  background: ${colors.secondary};
  color: ${colors.white};
  cursor: default;

  ${screen('max', 'xs')`
  ${itemStyleXS}
  `}
`;

export const MorePages = styled.span`
  ${itemStyle}

  cursor: default;
  opacity: .8;

  ${screen('max', 'xs')`
  ${itemStyleXS}
  `}
`;
