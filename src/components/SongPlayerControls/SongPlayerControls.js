import React from 'react';

import './SongPlayerControls.css';

const SongPlayerControls = ({
  handleNext,
  handlePrevious,
  handleVolumeChange,
  isPaused,
  toggleLoop,
  toggleMute,
  togglePlay,
  volumeInputValue,
}) => {
  const playIcon = isPaused ? <i className='fas fa-pause'></i> : <i className='fas fa-play'></i>;

  const volumeIcon = volumeInputValue ? (
    <i className='fas fa-volume-up'></i>
  ) : (
    <i className='fas fa-volume-mute'></i>
  );

  return (
    <div className='controls'>
      <button className='controls-button'>
        <i className='fas fa-random'></i>
      </button>
      <button className='controls-button' onClick={handlePrevious}>
        <i className='fas fa-step-backward'></i>
      </button>
      <button className='controls-button' onClick={togglePlay}>
        {playIcon}
      </button>
      <button className='controls-button' onClick={handleNext}>
        <i className='fas fa-step-forward'></i>
      </button>
      <button className='controls-button' onClick={toggleLoop}>
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
