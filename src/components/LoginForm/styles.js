import styled from 'styled-components';
import { Form as unformForm } from '@rocketseat/unform';
import { colors, fontSizes, screen } from '../../styles';

export const Form = styled(unformForm)`
  display: flex;
  position: relative;

  ${screen('max', 'md')`
  flex-direction: column;
  margin-bottom: 25px;
  `}
`;

export const LoginError = styled.span`
  position: absolute;
  left: 5px;
  top: 44px;
  color: ${colors.primary};
  font-size: ${fontSizes.smaller};
  line-height: 1.1;

  ${screen('max', 'md')`
  margin-top: -10px;
  margin-bottom: 10px;
  position: initial;
  `}
`;
