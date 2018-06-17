import { combineReducers } from 'redux';
import AlbumsReducer from './albums';
import ArtistsReducer from '../reducers/artists';
import AuthenticationReducer from './authentication';
import ErrorReducer from './error';
import ProgressReducer from './progress';
import UserReducer from './user';

const reducers = {
  albums: AlbumsReducer,
  artists: ArtistsReducer,
  authentication: AuthenticationReducer,
  error: ErrorReducer,
  progress: ProgressReducer,
  user: UserReducer,
};

export default combineReducers(reducers);
