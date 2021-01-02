import React from 'react';
import propTypes from 'prop-types';
import { useCurrentWidth } from '../../hooks/useCurrentWidth';

import { calcProperProgressBarWidth } from '../../utils/calcProperProgressBarWidth';
import { getCurrenProgressBarWidth } from '../../utils/getCurrentProgressBarWidth';
import { getTime } from '../../utils/getTime';

import './ProgressBar.css';

const ProgressBar = ({ currentTime, duration, handleCurrentTimeChange }) => {
  const formatedDuration = getTime(duration);
  const formatedCurrentTime = getTime(currentTime);
  const currentWidth = getCurrenProgressBarWidth(currentTime, duration) || 0;
  const width = useCurrentWidth('timebar-wrapper', 20);

  return (
    <div className='timebar-wrapper'>
      <p className='time'>{formatedCurrentTime}</p>
      <div
        className='bar-wrapper'
        onClick={handleCurrentTimeChange}
        style={{ width: calcProperProgressBarWidth(width) }}
      >
        <div className='bar' style={{ width: calcProperProgressBarWidth(width) }}></div>
        <div className='progress-bar' style={{ width: currentWidth }}></div>
      </div>
      <p className='duration'>{formatedDuration}</p>
    </div>
  );
};

ProgressBar.propTypes = {
  currentTime: propTypes.number.isRequired,
  duration: propTypes.number.isRequired,
  handleCurrentTimeChange: propTypes.func.isRequired,
};

export default ProgressBar;
