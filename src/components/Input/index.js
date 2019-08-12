import React from 'react';
import { Container, UnformInput } from './styles';

const Input = props => (
  <Container>
    <UnformInput {...props} />
  </Container>
);

export default Input;
