import { call, put } from 'redux-saga/effects';
import { CacheService, HelperService } from '../../services';
import { Creators as LoaderActions } from '../ducks/loader';
import { Creators as DonationsActions } from '../ducks/donations';

export function* getUserDonations({ userId }) {
  if (!userId) {
    throw new Error('You should pass the userId to donations/GET_USER_DONATIONS!');
  }

  /*
    Here would be the API request...
    But for now, we just mock the JSON.
  */
  const userDonations = [
    {
      _id: HelperService.mockId(),
      animalId: '5d5426f6209627a739f190e9',
      userId,
      amountDonated: 10.00,
    },
    {
      _id: HelperService.mockId(),
      animalId: '5d5426f6411981e9607308c2',
      userId,
      amountDonated: 5.00,
    },
    {
      _id: HelperService.mockId(),
      animalId: '5d5426f62a8a29ec23fbed31',
      userId,
      amountDonated: 5.50,
    },
    {
      _id: HelperService.mockId(),
      animalId: '5d5426f6fe4a36d70c2f895b',
      userId,
      amountDonated: 3.00,
    },
    {
      _id: HelperService.mockId(),
      animalId: '5d5426f67d41ed750e2be729',
      userId,
      amountDonated: 4.00,
    },
  ];

  yield call(CacheService.set, 'USER_DONATIONS', userDonations);
  yield put(DonationsActions.updateUserDonations(userDonations));
}

export function* addUserDonation({ animalId, userId, amountDonated }) {
  if (!animalId || !userId || !amountDonated) {
    throw new Error("You should pass the 'animalId', 'userId' and 'amountDonated' to donations/ADD_USER_DONATION!");
  }

  yield put(LoaderActions.startLoading('Donating...'));

  /*
    Here would be the API request...
    But for now, we just mock the JSON.
  */
  const userDonations = yield call(CacheService.get, 'USER_DONATIONS');

  userDonations.push({
    _id: HelperService.mockId(),
    animalId,
    userId,
    amountDonated,
  });

  /*
    Timeout for evaluation purposes only
    (for the loading be visible if the action was too fast)
  */
  yield new Promise(resolve => setTimeout(resolve, 1000));

  yield call(CacheService.set, 'USER_DONATIONS', userDonations);
  yield put(DonationsActions.updateUserDonations(userDonations));
  yield put(LoaderActions.stopLoading());
}
