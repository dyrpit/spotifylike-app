import React from 'react';

import { getCurrentWidth } from '../../utils/getCurrentWidth';
import { getTime } from '../../utils/getTime';

import './SongProgressBar.css';

const SongProgressBar = ({ currentTime, duration }) => {
  const formatedDuration = getTime(duration);
  const formatedCurrentTime = getTime(currentTime);
  const currentWidth = getCurrentWidth(currentTime, duration) || 0;

  return (
    <div>
      <div className='timebar-wrapper'>
        <p className='time'>{formatedCurrentTime}</p>
        <div className='bar-wrapper'>
          <div className='bar'></div>
          <div className='progress-bar' style={{ width: currentWidth }}></div>
        </div>
        <p className='duration'>{formatedDuration}</p>
      </div>
    </div>
  );
};

export default SongProgressBar;
