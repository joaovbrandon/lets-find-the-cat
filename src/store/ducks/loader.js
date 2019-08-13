import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    startLoading: ['message'],
    stopLoading: null,
  },
  { prefix: 'loader/' },
);

const INITIAL_STATE = {
  isLoading: false,
};

export const startLoading = (state, { message }) => ({
  isLoading: true,
  message,
});

export const stopLoading = () => INITIAL_STATE;

export default createReducer(INITIAL_STATE, {
  [Types.START_LOADING]: startLoading,
  [Types.STOP_LOADING]: stopLoading,
});
