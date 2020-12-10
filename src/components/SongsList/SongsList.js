import React from 'react';

import './SongsList.css';

const SongsList = ({ songs }) => {
  return (
    <section className='playlist-container'>
      <h3 className='section-title'>Playlist</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.title} onClick={() => console.log('lol')}>
            {song.title}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SongsList;
