import { decrementProgress, incrementProgress } from './progress';

// Action Creators
const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

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
  logUserOut,
};
