import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const albumAddFailure = error => ({ type: 'MUSIC_ALBUM_ADD_FAILURE', error });
const albumAddSuccess = json => ({ type: 'MUSIC_ALBUM_ADD_SUCCESS', json });
const albumSearchClear = () => ({ type: 'MUSIC_ALBUM_SEARCH_CLEAR' });
const albumSearchFailure = error => ({ type: 'MUSIC_ALBUM_SEARCH_FAILURE', error });
const albumSearchSuccess = json => ({ type: 'MUSIC_ALBUM_SEARCH_SUCCESS', json });

// Add an album
const addAlbum = (id) => {
  return async (dispatch) => {
    // Clear the error box if it is displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Send packet to our API, wich will communicate with Discogs
    await fetch(
      // where to contact
      '/api/albums/add',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((json) => {
      if (json.results) {
        return dispatch(albumAddSuccess(json));
      }
      return dispatch(albumAddFailure(new Error(json.error)));
    }).catch((err) => {
      dispatch(albumAddFailure(new Error(err)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

// Search Album
const searchAlbum = (searchText) => {
  return async (dispatch) => {
    // Clear the error box if it is displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: searchText,
      type: 'master',
      format: 'album',
    };

    // Send packet to our API, wich will communicate with Discogs
    await fetch(
      // where to contact
      '/api/albums/search',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(searchQuery),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((json) => {
      if (json.results) {
        return dispatch(albumSearchSuccess(json));
      }
      return dispatch(albumSearchFailure(new Error(json.error)));
    }).catch((err) => {
      dispatch(albumSearchFailure(new Error(err)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

export {
  // Action Creators
  albumAddFailure,
  albumAddSuccess,
  albumSearchClear,
  albumSearchFailure,
  albumSearchSuccess,
  // Others
  addAlbum,
  searchAlbum,
};
