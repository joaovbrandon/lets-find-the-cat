import React from 'react';
import PropTypes from 'prop-types';
import { Container, UnformInput, Icon } from './styles';

const Input = ({ inputStyle, icon, ...props }) => (
  <Container inputStyle={inputStyle}>
    <UnformInput {...props} />
    {icon && <Icon>{icon}</Icon>}
  </Container>
);

Input.defaultProps = {
  inputStyle: 1,
  icon: null,
};

Input.propTypes = {
  inputStyle: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default Input;
