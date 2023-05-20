import { useState } from 'react';
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
  const [deleteContact, { isLoading: isDeleting, isSuccess }] =
    useDeleteContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(id);
      console.log(isSuccess);

      if (isSuccess) {
        toast.success('Contact deleted!');
      }
    } catch (error) {
      toast.error('Contact not deleted!');
    }
  };

  const handleUpdateContact = async updatedContact => {
    try {
      await updateContact(updatedContact);
      console.log(isSuccess);
      toast.success('Contact changed!');
    } catch (error) {
      toast.error('Contact not changed!');
    }
  };

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
            handleDeleteContact();
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
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
            onEditSubmit={handleUpdateContact}
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
