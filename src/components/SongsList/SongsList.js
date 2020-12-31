import React from 'react';
import propTypes from 'prop-types';

import Song from '../Song/Song';

import './SongsList.css';

const SongsList = ({ handleChangeSong, songId, songs }) => {
  return (
    <section className='playlist-container'>
      <h3 className='section-title'>Playlist</h3>
      <ul>
        {songs.map((song) => (
          <Song
            key={song.id}
            active={songId === song.id ? 'active' : ''}
            handleChangeSong={handleChangeSong}
            song={song}
          />
        ))}
      </ul>
    </section>
  );
};

SongsList.propTypes = {
  handleChangeSong: propTypes.func.isRequired,
  songId: propTypes.number.isRequired,
  songs: propTypes.array.isRequired,
};

export default SongsList;
