import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterPage from './RegisterPage';

class RegisterPageContainer extends Component {
  constructor(props) {
    super(props);

    this.registerFunction = this.registerFunction.bind(this);
  }

  registerFunction(userData) {
    const { dispatch } = this.props;
    // dispatch(registerUser(userData));
  }

  render() {
    return (
      <div>
        <RegisterPage registerFunction={this.registerFunction} />
      </div>
    );
  }
}

export default connect()(RegisterPageContainer);
