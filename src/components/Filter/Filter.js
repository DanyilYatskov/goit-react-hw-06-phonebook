import React from 'react';
import PropTypes from 'prop-types';
import styles from './filter.module.scss';

const Filter = ({ value, onChange }) => (
  <label className={styles.label}>
    Find contacts by name
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </label>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
