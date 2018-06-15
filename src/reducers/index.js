import { combineReducers } from 'redux';
import AlbumsReducer from './albums';
import AuthenticationReducer from './authentication';
import ErrorReducer from './error';
import ProgressReducer from './progress';

const reducers = {
  albums: AlbumsReducer,
  authentication: AuthenticationReducer,
  error: ErrorReducer,
  progress: ProgressReducer,
};

export default combineReducers(reducers);
