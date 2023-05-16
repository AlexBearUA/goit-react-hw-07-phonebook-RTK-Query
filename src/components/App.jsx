import { Toaster } from 'react-hot-toast';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Loader } from './Loader/Loader';
import { useGetContactsQuery } from 'redux/contactsAPI';

import css from './App.module.css';

export const App = () => {
  const {
    data: contacts,
    isFetching: isLoading,
    isError: error,
  } = useGetContactsQuery();

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <AddContactForm contacts={contacts} />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && !error && <Loader />}

      {contacts && contacts.length > 0 && !error ? (
        <ContactList contacts={contacts} />
      ) : (
        !isLoading && <p className="list-is-empty">No contacts</p>
      )}
      {error && <p>Something going wrong, please refresh page</p>}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};
