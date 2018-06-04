const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

export {
  loginAttempt,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  sessionCheckFailure,
  sessionCheckSuccess,
};
