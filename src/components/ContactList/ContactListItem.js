import React from 'react';
import styles from './contactListItem.module.scss';
import PropTypes from 'prop-types';

const ContactListItem = ({
  contactName,
  contactNumber,
  contactId,
  onDeleteHandler,
}) => {
  return (
    <li className={styles.item}>
      <p className={styles.text}>
        {contactName} : {contactNumber}
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={() => onDeleteHandler(contactId)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  onDeleteHandler: PropTypes.func,
};
