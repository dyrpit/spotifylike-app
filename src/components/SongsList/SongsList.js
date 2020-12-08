import React from 'react';

const SongsList = ({ songs }) => {
  return (
    <section>
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
