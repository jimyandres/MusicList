import React, { Component } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // Catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      target.preventDefault();
      this.compileFormData();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { registerFunction } = this.props;
    const { formData } = this.state;
    registerFunction(formData);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <p>
            Want to get started saving your favorite bands to MusicList?
            Create an account! All fields are required.
          </p>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <Label for="email">Email</Label>
              <AvInput
                id="email"
                name="email"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="noreply@musiclist.com"
                type="email"
                required
                value={this.state.email}
              />
              <AvFeedback>A valid email is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="password">Password</Label>
              <AvInput
                id="password"
                name="password"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                type="password"
                required
                value={this.state.password}
              />
              <AvFeedback>Password must be at least eigth characters length.</AvFeedback>
              <span>
                We recommend a password service like&nbsp;
                <a href="https://www.lastpass.com/" target="_blank" rel="noopener noreferrer">LastPass</a>
                &nbsp;or <a href="https://1password.com/" target="_blank" rel="noopener noreferrer">1Password</a>
              </span>
            </AvGroup>

            <AvGroup>
              <Label for="username">Username</Label>
              <AvInput
                id="username"
                name="username"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="CaptainCode"
                type="text"
                required
                value={this.state.username}
              />
              <AvFeedback>A username is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="firstName">First Name</Label>
              <AvInput
                id="firstName"
                name="firstName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Jamie"
                type="text"
                required
                value={this.state.firstName}
              />
              <AvFeedback>A first name is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="lastName">Last Name</Label>
              <AvInput
                id="lastName"
                name="lastName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Smith"
                type="text"
                required
                value={this.state.lastName}
              />
              <AvFeedback>A last name is required to register.</AvFeedback>
            </AvGroup>

            <Button color="primary">Register</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
