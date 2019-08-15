import { createActions, createReducer } from 'reduxsauce';
import { CacheService, HelperService } from '../../services';

export const { Types, Creators } = createActions(
  {
    getUserDonations: ['userId'],
    addUserDonation: ['petId', 'userId', 'amountDonated'],
    updateUserDonations: ['userDonations', 'totalAmountDonated'],
    logout: null,
  },
  { prefix: 'donations/' },
);

const INITIAL_STATE = {
  userDonations: CacheService.get('USER_DONATIONS') || [],
  totalAmountDonated: CacheService.get('USER_TOTAL_AMOUNT_DONATED') || HelperService.currencyFormat(0),
};

export const getUserDonations = (state = INITIAL_STATE) => state;

export const addUserDonation = (state = INITIAL_STATE) => state;

export const updateUserDonations = (state = INITIAL_STATE, {
  userDonations, totalAmountDonated,
}) => ({
  ...state,
  userDonations,
  totalAmountDonated,
});

export const logout = () => ({
  ...INITIAL_STATE,
  userDonations: [],
  totalAmountDonated: HelperService.currencyFormat(0),
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_USER_DONATIONS]: getUserDonations,
  [Types.ADD_USER_DONATION]: addUserDonation,
  [Types.UPDATE_USER_DONATIONS]: updateUserDonations,
  [Types.LOGOUT]: logout,
});
