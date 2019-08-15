import { createActions, createReducer } from 'reduxsauce';
import { CacheService } from '../../services';

export const { Types, Creators } = createActions(
  {
    loginRequest: ['userInput', 'history'],
    loginSuccess: ['user'],
    loginFailure: null,
    logout: ['history'],
    logoutSuccess: null,
  },
  { prefix: 'auth/' },
);

const INITIAL_STATE = {
  user: CacheService.get('USER') || null,
  requesting: false,
  error: false,
};

export const loginRequest = (state = INITIAL_STATE) => ({
  ...state,
  requesting: true,
  error: false,
});

export const loginSuccess = (state, { user }) => ({
  ...state,
  user,
  requesting: false,
});

export const loginFailure = () => ({
  user: null,
  requesting: false,
  error: true,
});

export const logout = (state = INITIAL_STATE) => state;

export const logoutSuccess = () => ({
  ...INITIAL_STATE,
  user: null,
});

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
});
