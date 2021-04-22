import { combineReducers } from 'redux';
import { toast } from 'react-toastify';
import types from './contactsTypes';

const getInitialContactsFromLocalStorage = () => {
  const contacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(contacts);
  if (contacts) {
    return parsedContacts;
  } else {
    return [];
  }
};

const saveToLocalStorage = (previousContacts, updatedContacts) => {
  if (updatedContacts !== previousContacts) {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  }
};

const checkIfContactExists = (state, payload) => {
  console.log('state in find', state);
  console.log(payload);
  const contactFound = state.find(contact => contact.name === payload.name);
  if (contactFound !== undefined) {
    const notify = () =>
      toast.error(`${payload.name} is already in contacts`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
    return true;
  }
  return false;
};

const defaultFilterValue = '';

const contacts = (
  state = getInitialContactsFromLocalStorage(),
  { type, payload },
) => {
  switch (type) {
    case types.ADD: {
      if (checkIfContactExists(state, payload) === false) {
        return [...state, payload];
      }
      break;
    }

    case types.DELETE:
      return state.filter(({ id }) => id !== payload);

    default:
      return state;
  }
};

const contactsFilter = (state = defaultFilterValue, { type, payload }) => {
  switch (type) {
    case types.CHANGE_FILTER:
      return payload;

    default:
      return state;
  }
};

export default combineReducers({
  contacts,
  contactsFilter,
});
