import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { selectFilter } from 'redux/filterSlice';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Loader } from './Loader/Loader';
import { useGetContactsQuery } from 'redux/contactsAPI';
import css from './App.module.css';

export const App = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery();

  const filter = useSelector(selectFilter);

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <AddContactForm contacts={visibleContacts} />

      <h2>Contacts</h2>
      <Filter />
      {isFetching && !isError && <Loader />}

      {visibleContacts && visibleContacts.length > 0 && !isError ? (
        <ContactList contacts={visibleContacts} />
      ) : (
        !isFetching && <p className="list-is-empty">No contacts</p>
      )}
      {isError && <p>Something going wrong, please refresh page</p>}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};
