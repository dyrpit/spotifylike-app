import React from 'react';
import propTypes from 'prop-types';

import './Spinner.css';

const Spinner = ({ size }) => {
  return <div className={`spinner ${size}`}></div>;
};

Spinner.propTypes = {
  size: propTypes.string.isRequired,
};

export default Spinner;
