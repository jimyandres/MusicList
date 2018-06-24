import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordSaveClear, savePassword } from '../../actions/authentication';

import ChangePasswordPage from './ChangePasswordPage';

class ChangePasswordPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.sendPassword = this.sendPassword.bind(this);
  }

  // Clear password changed state on unmount
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(passwordSaveClear());
  }

  sendPassword(password) {
    const { dispatch } = this.props;
    const data = {
      hash: this.props.match.params.hash,
      password,
    };
    dispatch(savePassword(data));
  }

  render() {
    const { authentication } = this.props;
    return (
      <div>
        <ChangePasswordPage
          authentication={authentication}
          sendPasswordFunction={this.sendPassword}
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

export default connect(mapStateToProps)(ChangePasswordPageContainer);
