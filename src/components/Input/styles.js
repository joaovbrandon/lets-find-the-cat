import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  position: relative;
  margin: 0 5px 20px 5px;

  span {
    position: absolute;
    left: 5px;
    top: 44px;
    color: ${colors.primary};
    font-size: ${fontSizes.smaller};
    line-height: 1.1;
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
