import React, { Component } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Form from './components/Form';
import Section from './components/Section/';
import ContactsList from './components/ContactList/';
import Notification from './components/Notification/';
import Filter from './components/Filter/';

class App extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   const updatedContacts = this.props.contacts;
  //   const previousContacts = prevProps.contacts;
  //   if (updatedContacts !== previousContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  //   }
  // }

  render() {
    const { contacts } = this.props;
        return (
      <div className="App">
        <Section title="Phonebook">
          <Form />
        </Section>
        {contacts.length > 0 ? (
          <Section title="Contacts">
            <Filter />
            <ContactsList />
          </Section>
        ) : (
          <Notification message="Contacts are missing" />
        )}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ contacts: { contacts } }) => ({
  contacts: contacts,
});

export default connect(mapStateToProps, null)(App);
