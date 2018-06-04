import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  logOutClick(e) {
    e.preventDefault();
    const { logUserOutFunction } = this.props;
    logUserOutFunction();
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <span>
        Welcome, {name} | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
      </span>
    );
  }

  render() {
    const { isLoggedIn, firstName } = this.props.authentication;
    return (
      <header className="wrapper">
        <Navbar color="faed" light expand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">MusicList</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
