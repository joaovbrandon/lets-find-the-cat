import { createActions, createReducer } from 'reduxsauce';
import { CacheService } from '../../services';

export const { Types, Creators } = createActions(
  {
    getUserDonations: ['userId'],
    addUserDonation: ['animalId', 'userId', 'amountDonated'],
    updateUserDonations: ['userDonations'],
    logout: null,
  },
  { prefix: 'donations/' },
);

const INITIAL_STATE = {
  userDonations: CacheService.get('USER_DONATIONS') || null,
};

export const getUserDonations = (state = INITIAL_STATE) => state;

export const addUserDonation = (state = INITIAL_STATE) => state;

export const updateUserDonations = (state = INITIAL_STATE, { userDonations }) => ({
  ...state,
  userDonations,
});

export const logout = () => ({
  ...INITIAL_STATE,
  userDonations: null,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_USER_DONATIONS]: getUserDonations,
  [Types.ADD_USER_DONATION]: addUserDonation,
  [Types.UPDATE_USER_DONATIONS]: updateUserDonations,
  [Types.LOGOUT]: logout,
});
