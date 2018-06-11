import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHash, passwordResetClear } from '../../actions/authentication';

import ResetPasswordPage from './ResetPasswordPage';

class ResetPasswordPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.clearPasswordResetFunction = this.clearPasswordResetFunction.bind(this);
    this.resetPasswordRequest = this.resetPasswordRequest.bind(this);
  }

  clearPasswordResetFunction() {
    const { dispatch } = this.props;
    dispatch(passwordResetClear());
  }

  resetPasswordRequest(email) {
    const { dispatch } = this.props;
    dispatch(createHash(email));
  }

  render() {
    const { isPasswordReset } = this.props.authentication;
    return (
      <div>
        <ResetPasswordPage
          clearPasswordResetFunction={this.clearPasswordResetFunction}
          isPasswordReset={isPasswordReset}
          resetPasswordFunction={this.resetPasswordRequest}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(ResetPasswordPageContainer);
