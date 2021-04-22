import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';

const Button = ({ name, type  }) => {
  return (
    <button className={styles.button} type={type}>
      {name}
    </button>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
