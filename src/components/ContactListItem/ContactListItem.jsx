import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from 'components/Modal/Modal';
import { ButtonLoader } from 'components/Loaders/ButtonLoader';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'redux/contactsAPI';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id }) => {
  const [
    deleteContact,
    {
      isLoading: isDeleting,
      isSuccess: isSuccessDeleting,
      isError: isErrorDeleting,
    },
  ] = useDeleteContactMutation();

  const [
    updateContact,
    {
      isLoading: isUpdating,
      isSuccess: isSuccessUpdating,
      isError: isErrorUpdating,
    },
  ] = useUpdateContactMutation();

  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  useEffect(() => {
    isSuccessDeleting && toast.success('Contact deleted!');
    isSuccessUpdating && toast.success('Contact updated!');
    isErrorDeleting && toast.error('Contact not deleted!');
    isErrorUpdating && toast.error('Contact not updated!');
  }, [isSuccessDeleting, isSuccessUpdating, isErrorDeleting, isErrorUpdating]);

  return (
    <>
      <p>
        {name}: {number}
      </p>
      <div className={css.ItemButtons}>
        <button onClick={toggleModal} disabled={isUpdating}>
          {isUpdating ? (
            <>
              <ButtonLoader />
              <span>Editing...</span>
            </>
          ) : (
            <span>Edit</span>
          )}
        </button>
        <button
          onClick={() => {
            deleteContact(id);
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <ButtonLoader />
              <span>Deleting...</span>
            </>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditContactForm
            onEditSubmit={updateContact}
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
