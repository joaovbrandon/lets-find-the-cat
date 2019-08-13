import { call, put } from 'redux-saga/effects';
import { apiService } from '../../services';
import { Creators as LoaderActions } from '../ducks/loader';
import { Creators as AuthActions } from '../ducks/auth';

export function* login({ userInput, history }) {
  yield put(LoaderActions.startLoading('Logging In...'));

  try {
    /*
      Here would be the API request passing the userInput
      Which has userInput.Username and userInput.Password

      But for now, we just get the user from GitHub API!
    */
    const { data: userData } = yield call(apiService.gitHub.get, `/users/${userInput.Username}`);

    /*
      Here we define the user object using
      some data form GitHub API and mocks...
    */
    const user = {
      id: userData.id,
      login: userData.login,
      avatar_url: userData.avatar_url,
      name: userData.name,
      amountDonated: Math.floor(Math.random() * 100000),
    };

    /*
      Timeout for evaluation purposes only
      (for the loading be visible if the action was too fast)
    */
    yield new Promise(resolve => setTimeout(resolve, 1000));

    history.push('/');

    yield put(AuthActions.loginSuccess(user));
    yield put(LoaderActions.stopLoading());
  } catch (err) {
    yield put(AuthActions.loginFailure());
    yield put(LoaderActions.stopLoading());
  }
}
