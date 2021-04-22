import React from 'react';
import PropTypes from 'prop-types';
import styles from './notification.module.scss';

const Notification = ({ message }) => {
  return (
    <>
      <p className={styles.text}>{message}</p>
    </>
  );
};

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
