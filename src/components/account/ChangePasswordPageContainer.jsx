import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePassword } from '../../actions/authentication';

import ChangePasswordPage from './ChangePasswordPage';

class ChangePasswordPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.savePassword = this.savePassword.bind(this);
  }

  savePassword(formData) {
    const { dispatch } = this.props;
    const data = {
      hash: this.props.match.params.hash,
      password: formData.password,
    };
    dispatch(savePassword(data));
  }

  render() {
    return (
      <div>
        <ChangePasswordPage savePasswordFunction={this.savePassword} />
      </div>
    );
  }
}

export default connect()(ChangePasswordPageContainer);
