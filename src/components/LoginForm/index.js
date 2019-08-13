import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { Creators as AuthActions } from '../../store/ducks/auth';
import Input from '../Input';
import Button from '../Button';
import { Form, LoginError } from './styles';

const schema = Yup.object().shape({
  Username: Yup.string()
    .required(),
  Password: Yup.string()
    .min(4)
    .required(),
});

function LoginForm({
  loginRequest, requesting, error, history,
}) {
  return (
    <Form schema={schema} onSubmit={data => loginRequest(data, history)}>
      {error && <LoginError>Incorrect username or password.</LoginError>}
      <Input name="Username" type="text" placeholder="Username" />
      <Input name="Password" type="password" placeholder="Password" />
      <Button type="submit" disabled={requesting}>Log In</Button>
    </Form>
  );
}

LoginForm.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  requesting: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  requesting: state.auth.requesting,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(LoginForm);
