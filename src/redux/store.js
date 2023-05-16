import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filterSlice';
import { contactsApi } from './contactsAPI';

export const store = configureStore({
  reducer: {
    // contacts: contactsReducer,
    filter: filtersReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
