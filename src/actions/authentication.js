import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';

// Action Creators
const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

// Check User Session
const checkSession = () => {
  return async (dispatch) => {
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/checkSession',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((json) => {
      if (json.username) {
        return dispatch(sessionCheckSuccess(json));
      }
      return dispatch(sessionCheckFailure());
    }).catch(err => dispatch(sessionCheckFailure(err)));
  };
};

// Log User In
const logUserIn = (userData) => {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // register that a login attempt is being made
    dispatch(loginAttempt());

    // contact login API
    await fetch(
      // where to contact
      '/api/authentication/login',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
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
      if (json) {
        dispatch(loginSuccess(json));
      } else {
        dispatch(loginFailure(new Error('Authentication Failed')));
      }
    }).catch((error) => {
      dispatch(loginFailure(new Error(error)));
    });

    // turn off spinner
    return dispatch(decrementProgress());
  };
};

// Log User Out
const logUserOut = () => {
  return async (dispatch) => {
    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/logout',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    ).then((response) => {
      if (response.status === 200) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(new Error(`Error: ${response.status}`)));
      }
    }).catch((err) => {
      logoutFailure(err);
    });

    // turn off spinner
    dispatch(decrementProgress());
  };
};

export {
  // Action Creators
  loginAttempt,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  sessionCheckFailure,
  sessionCheckSuccess,
  // Others
  checkSession,
  logUserIn,
  logUserOut,
};
