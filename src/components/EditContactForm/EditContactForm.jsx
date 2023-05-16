import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editContact } from 'redux/operations';
import css from './EditContactForm.module.css';

export const EditContactForm = ({ onClose, name, number, id }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);
  const dispatch = useDispatch();

  const handleInputsChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'editName':
        setEditedName(value);
        break;
      case 'editNumber':
        setEditedNumber(value);
        break;
      default:
        console.log('error');
        break;
    }
  };

  const reset = () => {
    setEditedName('');
    setEditedNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editContact({ editedName, editedNumber, id }));
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={css.EditcontactForm}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          onChange={handleInputsChange}
          value={editedName}
          id="name"
          type="text"
          name="editName"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input
          onChange={handleInputsChange}
          value={editedNumber}
          id="number"
          type="tel"
          name="editNumber"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <div className={css.EditFormBtns}>
        <button type="submit">Edit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
