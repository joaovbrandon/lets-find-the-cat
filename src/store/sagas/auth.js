import { call, put } from 'redux-saga/effects';
import { AuthService, CacheService } from '../../services';
import { Creators as LoaderActions } from '../ducks/loader';
import { Creators as AuthActions } from '../ducks/auth';
import { Creators as DonationsActions } from '../ducks/donations';

export function* login({ userInput, history }) {
  if (!userInput || !userInput.Username || !userInput.Password) {
    throw new Error("You should pass the user input object with 'Username' and 'Password' to auth/LOGIN_REQUEST!");
  }

  if (!history || !history.push) {
    throw new Error("You should pass the 'history' with the 'push' method to auth/LOGIN_REQUEST!");
  }

  yield put(LoaderActions.startLoading('Logging In...'));

  try {
    /*
      Here would be the API request passing the userInput
      Which has userInput.Username and userInput.Password

      But for now, we just get the user from GitHub API!
    */
    const { data: userData } = yield call(AuthService.get, `/users/${userInput.Username}`);

    /*
      Here we define the user object using
      some data form GitHub API...
    */
    const user = {
      id: userData.id,
      login: userData.login,
      avatar_url: userData.avatar_url,
      name: userData.name,
    };

    /*
      Timeout for evaluation purposes only
      (for the loading be visible if the action was too fast)
    */
    yield new Promise(resolve => setTimeout(resolve, 1000));

    yield call(history.push, '/');
    yield call(CacheService.set, 'USER', user);
    yield put(DonationsActions.getUserDonations(user.id));
    yield put(AuthActions.loginSuccess(user));
    yield put(LoaderActions.stopLoading());
  } catch (err) {
    yield put(AuthActions.loginFailure());
    yield put(LoaderActions.stopLoading());
  }
}

export function* logout({ history }) {
  if (!history || !history.push) {
    throw new Error("You should pass the 'history' with the 'push' method to auth/LOGOUT!");
  }

  yield put(LoaderActions.startLoading('Logging out...'));
  yield call(CacheService.clear);
  yield put(DonationsActions.logout());

  /*
    Timeout for evaluation purposes only
    (for the loading be visible if the action was too fast)
  */
  yield new Promise(resolve => setTimeout(resolve, 500));

  yield call(history.push, '/');
  yield put(LoaderActions.stopLoading());
}
