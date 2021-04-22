import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.scss';

const Input = ({
  inputId,
  handleChange,
  inputName,
  value,
  pattern,
  title,
  type,
}) => {
  return (
    <label className={styles.label} htmlFor={inputId}>
      {inputName}
      <input
        className={styles.input}
        type={type}
        name={inputName}
        pattern={pattern}
        title={title}
        required
        value={value}
        id={inputId}
        onChange={handleChange}
      />
    </label>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
};
