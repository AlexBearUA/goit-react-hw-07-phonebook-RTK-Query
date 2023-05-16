import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from 'components/Modal/Modal';
import { ButtonLoader } from 'components/Loaders/ButtonLoader';
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

  const handleDelete = async () => {
    try {
      await deleteContact(id);
      toast.success('Contact deleted!');
    } catch (error) {
      toast.error('Contact not deleted!');
    }
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
            handleDelete();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ButtonLoader />
              <span>Deliting...</span>
            </>
          ) : (
            <span>Delete</span>
          )}
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
