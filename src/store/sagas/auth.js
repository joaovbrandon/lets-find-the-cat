import { all, call, put } from 'redux-saga/effects';
import { AuthService, CacheService, HelperService } from '../../services';
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

    yield all([
      call(history.push, '/'),
      call(HelperService.scrollToTop),
      call(CacheService.set, 'USER', user),
      put(DonationsActions.getUserDonations(user.id)),
      put(AuthActions.loginSuccess(user)),
      put(LoaderActions.stopLoading()),
    ]);
  } catch (err) {
    yield all([
      put(AuthActions.loginFailure()),
      put(LoaderActions.stopLoading()),
    ]);
  }
}

export function* logout({ history }) {
  if (!history || !history.push) {
    throw new Error("You should pass the 'history' with the 'push' method to auth/LOGOUT!");
  }

  yield put(LoaderActions.startLoading('Logging out...'));

  /*
    Timeout for evaluation purposes only
    (for the loading be visible if the action was too fast)
  */
  yield new Promise(resolve => setTimeout(resolve, 1000));

  yield all([
    call(CacheService.clear),
    call(history.push, '/'),
    call(HelperService.scrollToTop),
    put(DonationsActions.logout()),
    put(AuthActions.logoutSuccess()),
    put(LoaderActions.stopLoading()),
  ]);
}
