import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication';
import ErrorReducer from './error';
import ProgressReducer from './progress';

const reducers = {
  authentication: AuthenticationReducer,
  error: ErrorReducer,
  progress: ProgressReducer,
};

export default combineReducers(reducers);
