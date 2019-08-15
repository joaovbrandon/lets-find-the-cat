import { combineReducers } from 'redux';

import auth from './auth';
import donations from './donations';
import loader from './loader';

export default combineReducers({
  auth,
  donations,
  loader,
});
