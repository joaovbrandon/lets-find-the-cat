import { all, takeLatest } from 'redux-saga/effects';

// Auth
import { Types as AuthTypes } from '../ducks/auth';
import { login, logout } from './auth';

// Donations
import { Types as DonationsTypes } from '../ducks/donations';
import { getUserDonations, addUserDonation } from './donations';

export default function* rootSaga() {
  // Auth
  yield all([takeLatest(AuthTypes.LOGIN_REQUEST, login)]);
  yield all([takeLatest(AuthTypes.LOGOUT, logout)]);

  // Donations
  yield all([takeLatest(DonationsTypes.GET_USER_DONATIONS, getUserDonations)]);
  yield all([takeLatest(DonationsTypes.ADD_USER_DONATION, addUserDonation)]);
}
