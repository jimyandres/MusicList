import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHash } from '../../actions/authentication';

import ResetPasswordPage from './ResetPasswordPage';

class ResetPasswordPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.resetPasswordRequest = this.resetPasswordRequest.bind(this);
  }

  resetPasswordRequest(email) {
    const { dispatch } = this.props;
    dispatch(createHash(email));
  }

  render() {
    return (
      <div>
        <ResetPasswordPage resetPasswordFunction={this.resetPasswordRequest} />
      </div>
    );
  }
}

export default connect()(ResetPasswordPageContainer);
