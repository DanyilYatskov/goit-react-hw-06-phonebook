import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactListItem from './ContactListItem';
import styles from './contactList.module.scss';

const ContactList = ({ contacts }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contactName={contact.name}
          contactNumber={contact.number}
          contactId={contact.id}
        />
      ))}
    </ul>
  );
};

const getFilteredContacts = (contacts, contactsFilter) => {
  const normalizedFilter = contactsFilter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { contacts, contactsFilter } }) => ({
  contacts: getFilteredContacts(contacts, contactsFilter),
});

export default connect(mapStateToProps, null)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};
