import { all, call, put } from 'redux-saga/effects';
import { CacheService, HelperService } from '../../services';
import { Creators as LoaderActions } from '../ducks/loader';
import { Creators as DonationsActions } from '../ducks/donations';
import { Creators as PetsActions } from '../ducks/pets';

export function* getUserDonations({ userId }) {
  if (!userId) {
    throw new Error('You should pass the userId to donations/GET_USER_DONATIONS!');
  }

  /*
    Here would be the API request...
    But for now, we just mock the JSON.
  */
  const API_RESULT = [
    {
      id: HelperService.mockId(),
      petId: '5d551ace26c591e861e402c3',
      userId,
      amountDonated: 10.00,
    },
    {
      id: HelperService.mockId(),
      petId: '5d551ace0024492c28172987',
      userId,
      amountDonated: 5.00,
    },
    {
      id: HelperService.mockId(),
      petId: '5d551ace9f07485197b863bb',
      userId,
      amountDonated: 5.50,
    },
    {
      id: HelperService.mockId(),
      petId: '5d551ace2f8b5217de080f66',
      userId,
      amountDonated: 3.00,
    },
    {
      id: HelperService.mockId(),
      petId: '5d551ace011392f9f9b7bc9d',
      userId,
      amountDonated: 4.00,
    },
  ];

  const userDonations = yield API_RESULT.map(donation => ({
    ...donation,
    amountDonatedUnformatted: donation.amountDonated,
    amountDonated: HelperService.currencyFormat(donation.amountDonated),
  }));

  const totalAmountDonatedUnformatted = yield API_RESULT.reduce(
    (accumulator, donation) => accumulator + donation.amountDonated, 0,
  );

  const totalAmountDonated = yield HelperService.currencyFormat(totalAmountDonatedUnformatted);

  yield all([
    call(CacheService.set, 'USER_DONATIONS', userDonations),
    call(CacheService.set, 'USER_TOTAL_AMOUNT_DONATED', totalAmountDonated),
    put(DonationsActions.updateUserDonations(userDonations, totalAmountDonated)),
  ]);
}

export function* addUserDonation({ petId, userId, amountDonated }) {
  if (!petId || !userId || !amountDonated) {
    throw new Error("You should pass the 'petId', 'userId' and 'amountDonated' to donations/ADD_USER_DONATION!");
  }

  yield put(LoaderActions.startLoading('Donating...'));

  /*
    Here would be the API request...
    But for now, we just mock the JSON.
  */
  const userDonations = yield call(CacheService.get, 'USER_DONATIONS');

  yield userDonations.push({
    id: HelperService.mockId(),
    petId,
    userId,
    amountDonatedUnformatted: amountDonated,
    amountDonated: HelperService.currencyFormat(amountDonated),
  });

  const totalAmountDonatedUnformatted = yield userDonations.reduce(
    (accumulator, donation) => accumulator + donation.amountDonatedUnformatted, 0,
  );

  console.log('########## totalAmountDonatedUnformatted => ', totalAmountDonatedUnformatted);

  const totalAmountDonated = yield HelperService.currencyFormat(totalAmountDonatedUnformatted);

  console.log('########## totalAmountDonated => ', totalAmountDonated);

  /*
    Timeout for evaluation purposes only
    (for the loading be visible if the action was too fast)
  */
  yield new Promise(resolve => setTimeout(resolve, 1000));

  yield all([
    call(CacheService.set, 'USER_DONATIONS', userDonations),
    call(CacheService.set, 'USER_TOTAL_AMOUNT_DONATED', totalAmountDonated),
    put(PetsActions.updatePetAmountCollected(petId, amountDonated)),
    put(DonationsActions.updateUserDonations(userDonations, totalAmountDonated)),
    put(LoaderActions.stopLoading()),
  ]);
}
