import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contactsActions';
import Input from './Input/';
import Button from './Button/';
import styles from './form.module.scss';

class Form extends Component {
  static defaultProps = {
    name: '',
    number: '',
  };

  state = {
    name: this.props.name,
    number: this.props.number,
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name.toLowerCase()]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <Input
          inputName="Name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          value={name}
          inputId={this.nameInputId}
          handleChange={this.handleChange}
        />
        <Input
          inputName="Number"
          type="tel"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          value={number}
          inputId={this.numberInputId}
          handleChange={this.handleChange}
        />

        <Button name="Add Contact" type="Submit" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ name, number }) =>
    dispatch(contactsActions.addContact(name, number)),
});

export default connect(null, mapDispatchToProps)(Form);
