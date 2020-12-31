import React from 'react';
import propTypes from 'prop-types';

import Spinner from '../Spinner/Spinner';

import './Pending.css';

const Pending = ({ isPending, message }) => {
  return (
    <>
      {isPending && !message && (
        <div className='pending-container'>
          <Spinner size='l' />
        </div>
      )}
    </>
  );
};

Pending.propTypes = {
  isPending: propTypes.bool.isRequired,
  message: propTypes.string,
};

export default Pending;
