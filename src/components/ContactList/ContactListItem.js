import React from 'react';
import styles from './contactListItem.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contactsActions';

const ContactListItem = ({
  contactName,
  contactNumber,
  contactId,
  onDeleteContact,
}) => {
  return (
    <li className={styles.item}>
      <p className={styles.text}>
        {contactName} : {contactNumber}
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={() => onDeleteContact(contactId)}
      >
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(null, mapDispatchToProps)(ContactListItem);

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  onDeleteHandler: PropTypes.func,
};
