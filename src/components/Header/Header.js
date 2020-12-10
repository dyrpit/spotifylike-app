import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <header className='header-conatiner'>
      <h1 className='header-title'>Spotify-like App</h1>
      <a href='https://www.spotify.com' rel='noreferrer' target='_blank'>
        <div className='logo'>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
      </a>
    </header>
  );
};

export default Header;
