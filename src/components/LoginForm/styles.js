import styled from 'styled-components';
import { Form as unformForm } from '@rocketseat/unform';
import { colors, fontSizes, screen } from '../../styles';

export const Form = styled(unformForm)`
  display: flex;
  position: relative;

  ${screen('max', 'md')`
  flex-direction: column;
  margin-top: 30px;
  `}
`;

export const LoginError = styled.span`
  position: absolute;
  left: 10px;
  top: 43px;
  color: ${colors.primary};
  font-size: ${fontSizes.smaller};
  line-height: 1.1;

  ${screen('max', 'md')`
  font-size: ${fontSizes.regular};
  font-weigth: bold;
  margin-top: -10px;
  margin-bottom: 10px;
  position: initial;
  font-weight: bold;
  `}
`;
