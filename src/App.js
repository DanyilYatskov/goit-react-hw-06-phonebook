import React, { Component } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import contactsActions from './redux/contacts/contactsActions';
import Form from './components/Form';
import Section from './components/Section/';
import ContactsList from './components/ContactList/';
import Notification from './components/Notification/';
import Filter from './components/Filter/';

class App extends Component {
  state = {
    contacts: [],
  };

  // onChangeFilter = event => {
  //   this.setState({ filter: event.target.value });
  // };

  // getFilteredContacts = () => {
  //   const { filter, contacts } = this.state;
  //   const normalizedFilter = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter),
  //   );
  // };

  // addContact = ({ name, number }) => {
  //   const newContact = {
  //     id: uuidv4(),
  //     name: name,
  //     number: number,
  //   };
  //   const contactExists = this.state.contacts.find(
  //     contact => contact.name === newContact.name,
  //   );

  //   if (contactExists !== undefined) {
  //     const notify = () =>
  //       toast.error(`${newContact.name} is already in contacts`, {
  //         position: 'top-center',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     notify();
  //     return;
  //   }
  //   this.setState(({ contacts }) => ({
  //     contacts: [...contacts, newContact],
  //   }));
  // };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (contacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedContacts = this.state.contacts;
    const previousContacts = prevState.contacts;
    if (updatedContacts !== previousContacts) {
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  render() {
    const { contacts } = this.props;
    //const filteredContacts = this.getFilteredContacts();
    return (
      <div className="App">
        <Section title="Phonebook">
          <Form />
        </Section>
        {contacts.length > 0 ? (
          <Section title="Contacts">
            <Filter />
            <ContactsList
              contacts={contacts}
              onDeleteContact={this.props.onDeleteContact}
            />
          </Section>
        ) : (
          <Notification message="Contacts are missing" />
        )}
        <ToastContainer />
      </div>
    );
  }
}

const getFilteredContacts = (contacts, contactsFilter) => {
  const normalizedFilter = contactsFilter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { contacts, contactsFilter } }) => ({
  contacts: getFilteredContacts(contacts, contactsFilter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
