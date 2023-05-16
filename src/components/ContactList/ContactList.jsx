import { ContactListItem } from 'components/ContactListItem/ContactListItem';

import css from './ContactList.module.css';

export const ContactList = ({ contacts }) => {
  return (
    <ul className={css.ContactList}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={css.ContactListItem}>
          <ContactListItem name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
};
