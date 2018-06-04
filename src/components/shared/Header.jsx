import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => <NavLink tag={Link} to="/account/login">Log In</NavLink>;
const renderGreeting = name => <span>Welcome, {name}</span>;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
                { isLoggedIn ? renderGreeting(firstName) : renderLogin() }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
