import { all, takeLatest } from 'redux-saga/effects';

// Auth
import { Types as AuthTypes } from '../ducks/auth';
import { login, logout } from './auth';

// Pets
import { Types as PetsTypes } from '../ducks/pets';
import { getPetsList } from './pets';

// Donations
import { Types as DonationsTypes } from '../ducks/donations';
import { getUserDonations, addUserDonation } from './donations';

export default function* rootSaga() {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN_REQUEST, login),
    takeLatest(AuthTypes.LOGOUT, logout),

    // Pets
    takeLatest(PetsTypes.GET_PETS_LIST, getPetsList),

    // Donations
    takeLatest(DonationsTypes.GET_USER_DONATIONS, getUserDonations),
    takeLatest(DonationsTypes.ADD_USER_DONATION, addUserDonation),
  ]);
}
