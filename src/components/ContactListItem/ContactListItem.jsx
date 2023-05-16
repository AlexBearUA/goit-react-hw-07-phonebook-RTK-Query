import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from 'components/Modal/Modal';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import { useDeleteContactMutation } from 'redux/contactsAPI';
import css from './ContactListItem.module.css';

import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  return (
    <>
      <p>
        {name}: {number}
      </p>
      <div className={css.ItemButtons}>
        <button onClick={toggleModal}>Edit</button>
        <button
          onClick={() => {
            deleteContact(id);
            toast.error('Contact deleted!');
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Deliting...' : 'Delete'}
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditContactForm
            onClose={toggleModal}
            name={name}
            number={number}
            id={id}
          />
        </Modal>
      )}
    </>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
