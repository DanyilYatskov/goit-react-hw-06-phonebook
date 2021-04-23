import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import actions from './contactsActions';

const checkIfContactExists = (state, payload) => {
  const contactFound = state.find(
    contact => contact.name.toLowerCase() === payload.name.toLowerCase(),
  );
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

const defaultContactsValue = [];
const defaultFilterValue = '';

const contacts = createReducer(defaultContactsValue, {
  [actions.addContact]: (state, { payload }) =>
    checkIfContactExists(state, payload) ? [...state] : [...state, payload],
  [actions.deleteContact]: (state, actions) =>
    state.filter(({ id }) => id !== actions.payload),
});

const contactsFilter = createReducer(defaultFilterValue, {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  contacts,
  contactsFilter,
});
