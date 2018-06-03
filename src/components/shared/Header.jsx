import React from 'react';

const Header = ({ username }) => {
  return (
    <header>
      <h1>MusicList</h1>
      <div className="user-menu">
        <h2>Wellcome { username }</h2>
      </div>
    </header>
  );
};

export default Header;
