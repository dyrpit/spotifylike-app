import React from 'react';

import './SongsList.css';

const SongsList = ({ handleChangeSong, songs, songId }) => {
  return (
    <section className='playlist-container'>
      <h3 className='section-title'>Playlist</h3>
      <ul>
        {songs.map((song) => {
          const activeClass = songId === song.id ? 'active' : '';

          console.log(activeClass);

          return (
            <li
              className={`playlist-item ${activeClass}`}
              key={song.title}
              onClick={() => handleChangeSong(song)}
            >
              <p>
                {song.id}. {song.title}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SongsList;
