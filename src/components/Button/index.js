import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export default styled.button`
  margin-left: 5px;
  padding: 0 10px;
  height: 40px;
  border-radius: 8px;
  background: ${colors.secondary};
  border: 2px solid ${colors.primary};
  color: ${colors.white};
  font-size: ${fontSizes.small};
  font-weight: bold;
  cursor: pointer;
  transition: .5s;

  &:hover {
    background: ${colors.primary};
  }
`;
