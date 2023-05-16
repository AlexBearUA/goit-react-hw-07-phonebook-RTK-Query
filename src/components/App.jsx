import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Loader } from './Loader/Loader';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';

import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <AddContactForm />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && !error && <Loader />}

      {contacts.length > 0 && !error ? (
        <ContactList contacts={contacts} />
      ) : (
        <p className="list-is-empty">No contacts</p>
      )}
      {error && <p>Something going wrong, please refresh page</p>}
    </div>
  );
};
