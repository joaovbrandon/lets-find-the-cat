import styled from 'styled-components';
import { Form as unformForm } from '@rocketseat/unform';
import { screen } from '../../styles';

export const Form = styled(unformForm)`
  display: flex;

  ${screen('max', 'md')`
    flex-direction: column;
  `}
`;
