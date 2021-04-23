import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/add', (name, number) => ({
  payload: {
    id: uuidv4(),
    name: name,
    number: number,
  },
}));

const deleteContact = createAction('contacts/delete');

const changeFilter = createAction('contacts/changeFilter');

const exportObject = { addContact, deleteContact, changeFilter };
export default exportObject;

// export default { addContact, deleteContact, changeFilter };
