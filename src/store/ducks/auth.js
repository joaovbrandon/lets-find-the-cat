import { createActions, createReducer } from 'reduxsauce';
import { cacheService } from '../../services';

export const { Types, Creators } = createActions(
  {
    loginRequest: ['userInput', 'history'],
    loginSuccess: ['user'],
    loginFailure: null,
    logout: null,
  },
  { prefix: 'auth/' },
);

const INITIAL_STATE = {
  user: cacheService.get('USER') || null,
  requesting: false,
  error: false,
};

export const loginRequest = (state = INITIAL_STATE) => ({
  ...state,
  requesting: true,
});

export const loginSuccess = (state, { user }) => {
  cacheService.set('USER', user);

  return {
    user,
    requesting: false,
    error: false,
  };
};

export const loginFailure = () => ({
  user: null,
  requesting: false,
  error: true,
});

export const logout = () => {
  cacheService.clear();

  return {
    user: null,
    requesting: false,
    error: false,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
