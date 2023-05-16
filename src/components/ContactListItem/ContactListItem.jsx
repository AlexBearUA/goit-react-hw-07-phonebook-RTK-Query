import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { Modal } from 'components/Modal/Modal';
import { EditContactForm } from 'components/EditContactForm/EditContactForm';
import css from './ContactListItem.module.css';

import PropTypes from 'prop-types';

export const ContactListItem = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  const handleDelete = () => dispatch(deleteContact(id));
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <div className={css.ItemButtons}>
        <button onClick={toggleModal}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
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
