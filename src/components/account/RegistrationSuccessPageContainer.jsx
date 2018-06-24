import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registrationSuccessViewed } from '../../actions/authentication';

import RegistrationSuccessPage from './RegistrationSuccessPage';

class RegistrationSuccessPageContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(registrationSuccessViewed());
  }

  render() {
    return (
      <div>
        <RegistrationSuccessPage />
      </div>
    );
  }
}

export default connect()(RegistrationSuccessPageContainer);
