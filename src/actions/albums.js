import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const albumAddFailure = error => ({ type: 'MUSIC_ALBUM_ADD_FAILURE', error });
const albumAddSuccess = json => ({ type: 'MUSIC_ALBUM_ADD_SUCCESS', json });
const albumDeleteFailure = error => ({ type: 'MUSIC_ALBUM_DELETE_FAILURE', error });
const albumDeleteSuccess = json => ({ type: 'MUSIC_ALBUM_DELETE_SUCCESS', json });
const albumLatestFailure = error => ({ type: 'MUSIC_ALBUM_LATEST_FAILURE', error });
const albumLatestSuccess = json => ({ type: 'MUSIC_ALBUM_LATEST_SUCCESS', json });
const albumSearchClear = () => ({ type: 'MUSIC_ALBUM_SEARCH_CLEAR' });
const albumSearchFailure = error => ({ type: 'MUSIC_ALBUM_SEARCH_FAILURE', error });
const albumSearchSuccess = json => ({ type: 'MUSIC_ALBUM_SEARCH_SUCCESS', json });
const albumsPopulateFailure = error => ({ type: 'MUSIC_ALBUMS_POPULATE_FAILURE', error });
const albumsPopulateSuccess = json => ({ type: 'MUSIC_ALBUMS_POPULATE_SUCCESS', json });

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
      if (json.email) {
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

// Delete an album from user's list
const deleteAlbum = (albumId) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/albums/delete',
      {
        method: 'POST',
        body: JSON.stringify({ albumId }),
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
      if (!json.error) {
        dispatch(populateAlbums(json.albums)); // eslint-disable-line
      }
      return json;
    }).then((json) => {
      if (!json.error) {
        return dispatch(albumDeleteSuccess(json));
      }
      return dispatch(albumDeleteFailure(new Error(json.error)));
    }).catch(error => dispatch(albumDeleteFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Get the latest album from the Discogs API
const getLatestAlbum = () => {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: '',
      type: 'master',
      format: 'album',
      sort_order: 'asc',
    };

    // Send packet to our API, which will communicate with Discogs
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
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.results) {
        return dispatch(albumLatestSuccess(json.results[0]));
      }
      return dispatch(albumLatestFailure(new Error(json.error)));
    })
    .catch(error => dispatch(albumLatestFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Populate Album data
const populateAlbums = (albums) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/albums/populate',
      {
        method: 'POST',
        body: JSON.stringify(albums),
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
      if (!json.error) {
        return dispatch(albumsPopulateSuccess(json));
      }
      return dispatch(albumsPopulateFailure(new Error(json.error)));
    }).catch(error => dispatch(albumsPopulateFailure(new Error(error))));

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
  albumDeleteFailure,
  albumDeleteSuccess,
  albumLatestFailure,
  albumLatestSuccess,
  albumSearchClear,
  albumSearchFailure,
  albumSearchSuccess,
  albumsPopulateFailure,
  albumsPopulateSuccess,
  // Others
  addAlbum,
  deleteAlbum,
  getLatestAlbum,
  populateAlbums,
  searchAlbum,
};
