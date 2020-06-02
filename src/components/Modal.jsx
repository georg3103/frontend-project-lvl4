import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import connect from '../connect';

function MyModal({ title, hideModal, children }) {
  return (
    <>
      <Modal show onHide={hideModal}>
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
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect()(MyModal);
