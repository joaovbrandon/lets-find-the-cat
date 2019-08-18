import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.div`
  position: relative;

  ${({ inputStyle }) => {
    if (inputStyle === 2) return 'margin: 20px 0 5px 0;';
    return 'margin: 0 5px 8px 5px;';
  }}

  span {
  position: absolute;
  display: table-cell;
  padding: 3px 0 0 5px;
  color: ${colors.primary};
  font-size: ${fontSizes.smaller};
  line-height: .9;

  ${({ inputStyle }) => {
    if (inputStyle !== 2) return null;

    return `
      font-size: ${fontSizes.small};
      margin-top: -61px;
      left: 0;
      right: 0;
      font-weight: bold;
    `;
  }}

  ${screen('max', 'sm')`
  ${({ inputStyle }) => {
    if (inputStyle === 2) return `font-size: ${fontSizes.regular};`;

    return `
      position: initial;
      font-size: ${fontSizes.small};
    `;
  }}
  `}
  }
`;

export const UnformInput = styled(Input)`
  padding: 5px 10px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
  font-size: ${fontSizes.small};

  &::placeholder {
    color: ${colors.primary};
  }
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 15px;
  height: 40px;
`;
