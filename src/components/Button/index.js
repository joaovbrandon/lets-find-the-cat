import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export default styled.button`
  margin-left: 5px;
  padding: 0 10px;
  height: 40px;
  border-radius: 8px;
  background: ${({ btnStyle }) => {
    if (btnStyle === 2) return 'transparent';
    return colors.secondary;
  }};
  border: ${({ btnStyle }) => {
    if (btnStyle === 2) return `2px solid ${colors.secondary}`;
    return `2px solid ${colors.primary}`;
  }};
  color: ${({ btnStyle }) => {
    if (btnStyle === 2) return colors.secondary;
    return colors.white;
  }};
  font-size: ${fontSizes.small};
  font-weight: bold;
  cursor: pointer;
  transition: .5s;

  &:hover {
  background: ${({ btnStyle }) => {
    if (btnStyle === 2) return 'transparent';
    return colors.primary;
  }};
  border: ${({ btnStyle }) => {
    if (btnStyle === 2) return `2px solid ${colors.primary}`;
    return null;
  }};
  }
`;
