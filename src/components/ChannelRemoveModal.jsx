import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelector } from '../redux';
import connect from '../connect';
import Modal from './Modal';

const ChannelAddModal = ({
  deleteChannel,
  id,
}) => {
  const modalState = useSelector(getSelector('modalState'));
  return (
    <Modal title="Edit Channel">
      <button
        type="button"
        onClick={() => deleteChannel(id)}
        disabled={modalState === 'fetching'}
      >
        Delete
      </button>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  deleteChannel: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect()(ChannelAddModal);
