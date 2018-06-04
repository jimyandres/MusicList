import React, { Component } from 'react';
import 'whatwg-fetch';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';

import LoginPage from './LoginPage';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.attemptLogIn = this.attemptLogIn.bind(this);
  }

  async attemptLogIn(userData) {
    const { incrementProgressAction, decrementProgressAction } = this.props;

    // turn on spinner
    incrementProgressAction();

    // contact login API
    const loginResponse = await fetch(
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
    );

    console.log(loginResponse);

    // turn off spinner
    decrementProgressAction();
  }

  render() {
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
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginPageContainer);
