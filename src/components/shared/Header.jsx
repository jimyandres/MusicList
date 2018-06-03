import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username }) => {
  return (
    <header>
      <h1>MusicList</h1>
      <div className="user-menu">
        <h2>Wellcome { username }</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/someone">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
