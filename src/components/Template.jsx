import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ChangePasswordPage from './account/ChangePasswordPageContainer';
import ErrorBox from './shared/ErrorBoxContainer';
import Header from './shared/HeaderContainer';
import HomePage from './home/HomePageContainer';
import LoginPage from './account/LoginPageContainer';
import ProfilePage from './account/ProfilePage';
import RegisterPage from './account/RegisterPageContainer';
import RegistrationSuccessPage from './account/RegistrationSuccessPageContainer';
import ResetPasswordPage from './account/ResetPasswordPageContainer';

const Template = (props) => {
  const { authentication, progress } = props;
  return (
    <Router>
      <div className="wrapper">
        <Header authentication={authentication} />
        <section className="page-content container-fluid">
          <ErrorBox />
          <Route exact path="/" component={HomePage} />
          <Route path="/account/change-password/:hash" component={ChangePasswordPage} />
          <Route exact path="/account/login" component={LoginPage} />
          <Route path="/account/profile/:id" component={ProfilePage} />
          <Route exact path="/account/register" component={RegisterPage} />
          <Route exact path="/account/registration-success" component={RegistrationSuccessPage} />
          <Route exact path="/account/reset-password" component={ResetPasswordPage} />
        </section>
        <div className="loader-wrapper" style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
            <div className="loader">Loading...</div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Template;
