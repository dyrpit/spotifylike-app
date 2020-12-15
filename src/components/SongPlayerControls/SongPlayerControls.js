import React from 'react';

import './SongPlayerControls.css';

const SongPlayerControls = ({
  handleSkipSong,
  handleVolumeChange,
  isLooping,
  isPaused,
  isShuffled,
  toggleLoop,
  toggleMute,
  togglePlay,
  toggleShuffle,
  volumeInputValue,
}) => {
  const playIcon = !isPaused ? <i className='fas fa-pause'></i> : <i className='fas fa-play'></i>;

  const volumeIcon = volumeInputValue ? (
    <i className='fas fa-volume-up'></i>
  ) : (
    <i className='fas fa-volume-mute'></i>
  );

  const activeLoopButtonColor = isLooping ? 'active' : '';
  const activeShuffleButtonColor = isShuffled ? 'active' : '';

  return (
    <div className='controls'>
      <button className={`controls-button ${activeShuffleButtonColor}`} onClick={toggleShuffle}>
        <i className='fas fa-random'></i>
      </button>
      <button className='controls-button' onClick={() => handleSkipSong('backward')}>
        <i className='fas fa-step-backward'></i>
      </button>
      <button className='controls-button' onClick={togglePlay}>
        {playIcon}
      </button>
      <button className='controls-button' onClick={() => handleSkipSong('forward')}>
        <i className='fas fa-step-forward'></i>
      </button>
      <button className={`controls-button ${activeLoopButtonColor}`} onClick={toggleLoop}>
        <i className='fas fa-sync'></i>
      </button>
      <input
        type='range'
        min='0'
        max='100'
        onChange={handleVolumeChange}
        value={volumeInputValue}
      />
      <button className='controls-button' onClick={toggleMute}>
        {volumeIcon}
      </button>
    </div>
  );
};

export default SongPlayerControls;
