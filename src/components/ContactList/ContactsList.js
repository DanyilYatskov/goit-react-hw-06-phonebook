import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem';
import styles from './contactList.module.scss';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contactName={contact.name}
          contactNumber={contact.number}
          contactId={contact.id}
          onDeleteHandler={onDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};
