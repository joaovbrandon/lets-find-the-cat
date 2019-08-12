import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { Creators as LoaderActions } from '../../store/ducks/loader';
import Input from '../Input';
import Button from '../Button';
import { Form } from './styles';

const schema = Yup.object().shape({
  Username: Yup.string()
    .required(),
  Password: Yup.string()
    .min(4)
    .required(),
});

function LoginForm({ startLoading, stopLoading }) {
  const handleLogin = (data) => {
    startLoading();

    // eslint-disable-next-line no-console
    console.log('########## data => ', data);

    setTimeout(() => {
      stopLoading();
    }, 1000);
  };

  return (
    <Form schema={schema} onSubmit={handleLogin}>
      <Input name="Username" type="text" placeholder="Username" />
      <Input name="Password" type="password" placeholder="Password" />
      <Button type="submit">Log In</Button>
    </Form>
  );
}

LoginForm.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(LoaderActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
