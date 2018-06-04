import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication';
import ProgressReducer from './progress';

const reducers = {
  authentication: AuthenticationReducer,
  progress: ProgressReducer,
};

export default combineReducers(reducers);
