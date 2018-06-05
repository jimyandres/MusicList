import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authentication';

import RegisterPage from './RegisterPage';

class RegisterPageContainer extends Component {
  constructor(props) {
    super(props);

    this.registerFunction = this.registerFunction.bind(this);
  }

  registerFunction(userData) {
    const { dispatch } = this.props;
    dispatch(registerUser(userData));
  }

  render() {
    const { isLoggedIn } = this.props.authentication;

    // User needs to be logged out to register
    if (isLoggedIn) {
      return (<p>Please log out before registering a new user.</p>);
    }

    // Otherwise display the form
    return <RegisterPage registerFunction={this.registerFunction} />;
  }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(RegisterPageContainer);
