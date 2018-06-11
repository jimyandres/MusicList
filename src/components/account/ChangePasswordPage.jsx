import React, { Component } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class ChangePasswordPage extends Component {
  constructor(props) {
    super(props);

    // component state
    this.state = {
      password: '',
      passwordCheck: '',
    };

    // bound functions
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleValidSubmit();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { password } = this.state;
    const { sendPasswordFunction } = this.props;
    sendPasswordFunction(password);
  }

  render() {
    const { isPasswordChanged, isLoggedIn } = this.props.authentication;

    //  If they just changed the password and aren't logged in
    if (isPasswordChanged && !isLoggedIn) {
      return (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <p>
              Your changes have been saved, and you can
              now <Link to="/account/login">log in</Link> with
              the new password.
            </p>
          </div>
        </div>
      );
    }

    // If they just changed the password and are logged in
    if (isPasswordChanged && isLoggedIn) {
      return (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <p>
              Your new password has been saved.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <p>
            Please enter and confirm a new password below to change the
            password associated with this email address.
          </p>

          <AvForm onValidSubmit={this.handleValidSubmit}>

            <AvGroup>
              <Label for="password">Password</Label>
              <AvInput
                id="password"
                minLength="8"
                name="password"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                required
                type="password"
                value={this.state.password}
              />
              <AvFeedback>Passwords must be at least eight characters in length</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="password">Confirm Password</Label>
              <AvInput
                id="passwordCheck"
                minLength="8"
                name="passwordCheck"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password again"
                required
                type="password"
                validate={{ match: { value: 'password' } }}
                value={this.state.passwordCheck}
              />
              <AvFeedback>Passwords must match</AvFeedback>
            </AvGroup>

            <Button color="primary">Change Password</Button>

          </AvForm>
        </div>
      </div>
    );
  }
}

export default ChangePasswordPage;
