import React from 'react';
import { useCurrentWidth } from '../../hooks/useCurrentWidth';

import { getCurrenProgressBarWidth } from '../../utils/getCurrentProgressBarWidth';
import { getTime } from '../../utils/getTime';

import './ProgressBar.css';

const ProgressBar = ({ currentTime, duration, handleCurrentTimeChange }) => {
  const formatedDuration = getTime(duration);
  const formatedCurrentTime = getTime(currentTime);
  const currentWidth = getCurrenProgressBarWidth(currentTime, duration) || 0;

  const width = useCurrentWidth(300);

  return (
    <div className='timebar-wrapper'>
      <p className='time'>{formatedCurrentTime}</p>
      <div className='bar-wrapper' onClick={handleCurrentTimeChange}>
        <div className='bar'></div>
        <div className='progress-bar' style={{ width: currentWidth }}></div>
      </div>
      <p className='duration'>{formatedDuration}</p>
    </div>
  );
};

export default ProgressBar;
