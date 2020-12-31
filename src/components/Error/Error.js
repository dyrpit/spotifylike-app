import React from 'react';
import propTypes from 'prop-types';

import './Error.css';

const Error = ({ handleRefresh, message }) => {
  return (
    <>
      {message && (
        <div className='error-container'>
          <button className='error-button' onClick={handleRefresh}>
            Refresh
          </button>
          <p className='error-message'>{message}</p>
        </div>
      )}
    </>
  );
};

Error.propTypes = {
  handleRefresh: propTypes.func.isRequired,
  message: propTypes.string.isRequired,
};

export default Error;
