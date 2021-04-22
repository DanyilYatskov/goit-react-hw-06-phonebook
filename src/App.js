import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import { alert } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/confirm/dist/PNotifyConfirm.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from './components/Form';
import Section from './components/Section/';
import ContactsList from './components/ContactList/';
import Notification from './components/Notification/';
import Filter from './components/Filter/';

class App extends Component {
  // static defaultProps = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  // };

  state = {
    contacts: [],
    filter: '',
  };

  onChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    const contactExists = this.state.contacts.find(
      contact => contact.name === newContact.name,
    );

    if (contactExists !== undefined) {
      // alert({
      //   title: 'Oops',
      //   text: `${newContact.name} is already in contacts`,
      // });
      const notify = () =>
        toast.error(`${newContact.name} is already in contacts`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

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
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="App">
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        {contacts.length > 0 ? (
          <Section title="Contacts">
            <Filter value={filter} onChange={this.onChangeFilter} />
            <ContactsList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
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

export default App;
