import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import { colors, fontSizes, screen } from '../../styles';

export const Container = styled.div`
  position: relative;

  ${({ inputStyle }) => {
    if (inputStyle === 2) return 'margin: 15px 5px 5px 5px;';
    return 'margin: 0 5px 5px 5px;';
  }}

  ${screen('max', 'md')`
  ${({ inputStyle }) => {
    if (inputStyle === 2) return null;
    return 'margin: 0 5px 20px 5px;';
  }}
  `}

  span {
  position: absolute;
  color: ${colors.primary};
  font-size: ${fontSizes.smaller};
  line-height: 1.1;

  ${({ inputStyle }) => {
    if (inputStyle === 2) {
      return `
        top: -18px;
        left: 0;
        right: 0;
      `;
    }

    return `
      top: 44px;
      left: 5px;
    `;
  }}
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
