import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';
import { loginAttempt, loginSuccess, loginFailure } from '../../actions/authentication';

import LoginPage from './LoginPage';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.attemptLogIn = this.attemptLogIn.bind(this);
  }

  async attemptLogIn(userData) {
    const {
      incrementProgressAction,
      decrementProgressAction,
      loginAttemptAction,
      loginSuccessAction,
      loginFailureAction,
    } = this.props;

    // turn on spinner
    incrementProgressAction();

    // register that a login attempt is being made
    loginAttemptAction();

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
        loginSuccessAction(json);
        this.setState({ redirect: true });
      } else {
        loginFailureAction(new Error('Authentication Failed'));
      }
    }).catch((error) => {
      loginFailureAction(new Error(error));
    });

    // turn off spinner
    decrementProgressAction();
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <LoginPage loginFunction={this.attemptLogIn} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
    loginAttemptAction: loginAttempt,
    loginSuccessAction: loginSuccess,
    loginFailureAction: loginFailure,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginPageContainer);
