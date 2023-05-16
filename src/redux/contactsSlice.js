import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
import {
  handlePending,
  handleRejected,
  handleFulfilled,
  handleFulfilledFetch,
  handleFulfilledAdd,
  handleFulfilledDel,
  handleFulfilledEdit,
} from '../services/response-handlers';

const arrayOfThunks = [fetchContacts, addContact, deleteContact, editContact];

const setThunkStatus = status => arrayOfThunks.map(thunk => thunk[status]);

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], isLoading: false, error: null },

  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledFetch)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDel)
      .addCase(editContact.fulfilled, handleFulfilledEdit)
      .addMatcher(isAnyOf(...setThunkStatus(REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...setThunkStatus(PENDING)), handlePending)
      .addMatcher(isAnyOf(...setThunkStatus(FULFILLED)), handleFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;
