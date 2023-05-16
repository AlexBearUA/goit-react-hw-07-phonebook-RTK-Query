import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCreateContactMutation } from 'redux/contactsAPI';
import { ButtonLoader } from 'components/Loaders/ButtonLoader';
import css from './AddContactForm.module.css';

export const AddContactForm = ({ contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleInputsChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('error');
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleCreateContact = async newContact => {
    try {
      await createContact(newContact);
      toast.success('Contact added!');
    } catch (error) {
      toast.error('Contact not added!');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isInContacts) {
      toast.error(`${name} is already in contacts`);
      reset();
      return;
    }
    const newContact = {
      name,
      number,
    };

    handleCreateContact(newContact);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactForm}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          onChange={handleInputsChange}
          value={name}
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input
          onChange={handleInputsChange}
          value={number}
          id="number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <ButtonLoader /> <span>Adding contact...</span>
          </>
        ) : (
          <span>Add contact</span>
        )}
      </button>
    </form>
  );
};
