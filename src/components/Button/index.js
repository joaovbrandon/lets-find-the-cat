import styled from 'styled-components';
import { colors, fontSizes } from '../../styles';

export default styled.button`
  margin-left: 5px;
  padding: 0 10px;
  height: 40px;
  border-radius: 8px;
  font-size: ${fontSizes.small};
  font-weight: bold;
  cursor: pointer;
  transition: .5s;

  ${({ btnStyle }) => {
    if (btnStyle === 2) {
      return `
        background: transparent;
        border: 2px solid ${colors.secondary};
        color: ${colors.secondary};
      `;
    }

    return `
      background: ${colors.secondary};
      border: 2px solid ${colors.primary};
      color: ${colors.white};
    `;
  }}

  &:hover {
  ${({ btnStyle }) => {
    if (btnStyle === 2) return 'background: transparent;';

    return `
      background: ${colors.primary};
      border: 2px solid ${colors.primary};
    `;
  }}
  }
`;
