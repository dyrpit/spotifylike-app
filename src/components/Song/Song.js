import React from 'react';
import propTypes from 'prop-types';

import './Song.css';

const Song = ({ active, handleChangeSong, song }) => {
  return (
    <li
      className={`playlist-item ${active}`}
      key={song.title}
      onClick={() => handleChangeSong(song)}
    >
      <p>
        {song.id}. {song.title}
      </p>
    </li>
  );
};

Song.propTypes = {
  active: propTypes.string,
  handleChangeSong: propTypes.func.isRequired,
  song: propTypes.object.isRequired,
};

export default Song;
