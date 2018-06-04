const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });

export {
  loginAttempt,
  loginFailure,
  loginSuccess,
};
