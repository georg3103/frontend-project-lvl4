import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { actions } from '../redux';

function MyModal({ title, children }) {
  const dispatch = useDispatch();
  return (
    <>
      <Modal show onHide={() => dispatch(actions.hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

MyModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MyModal;
