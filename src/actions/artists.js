import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const artistAddFailure = error => ({ type: 'MUSIC_ARTIST_ADD_FAILURE', error });
const artistAddSuccess = json => ({ type: 'MUSIC_ARTIST_ADD_SUCCESS', json });
const artistSearchClear = () => ({ type: 'MUSIC_ARTIST_SEARCH_CLEAR' });
const artistSearchFailure = error => ({ type: 'MUSIC_ARTIST_SEARCH_FAILURE', error });
const artistSearchSuccess = json => ({ type: 'MUSIC_ARTIST_SEARCH_SUCCESS', json });
const artistsPopulateFailure = error => ({ type: 'MUSIC_ARTISTS_POPULATE_FAILURE', error });
const artistsPopulateSuccess = json => ({ type: 'MUSIC_ARTISTS_POPULATE_SUCCESS', json });

// Add an Artist
const addArtist = (id) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/artists/add',
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
        return dispatch(artistAddSuccess(json));
      }
      return dispatch(artistAddFailure(new Error(json.error)));
    }).catch(error => dispatch(artistAddFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

// Populate Artist data
const populateArtists = (artists) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/artists/populate',
      {
        method: 'POST',
        body: JSON.stringify(artists),
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
        return dispatch(artistsPopulateSuccess(json));
      }
      return dispatch(artistsPopulateFailure(new Error(json.error)));
    }).catch(error => dispatch(artistsPopulateFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

// Search Artists
const searchArtists = (searchText) => {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());


    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: searchText,
      type: 'artist',
    };

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/artists/search',
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
        return dispatch(artistSearchSuccess(json));
      }
      return dispatch(artistSearchFailure(new Error(json.error)));
    }).catch(error => dispatch(artistSearchFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

export {
  // action creators
  artistAddFailure,
  artistAddSuccess,
  artistSearchClear,
  artistSearchFailure,
  artistSearchSuccess,
  artistsPopulateFailure,
  artistsPopulateSuccess,
  // helpers
  addArtist,
  populateArtists,
  searchArtists,
};
