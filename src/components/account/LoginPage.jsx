import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeHolder="noreply@musiclist.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeHolder="Password"
              />
            </FormGroup>
            <Button>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
