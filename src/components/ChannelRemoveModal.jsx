import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getSelector } from '../redux';
import connect from '../connect';
import Modal from './Modal';

const ChannelAddModal = ({
  deleteChannel,
  id,
}) => {
  const { t } = useTranslation();
  const modalState = useSelector(getSelector('modalState'));
  return (
    <Modal title={t('remove_channel_title')}>
      <button
        type="button"
        onClick={() => deleteChannel(id)}
        disabled={modalState === 'fetching'}
      >
        {t('delete')}
      </button>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  deleteChannel: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect()(ChannelAddModal);
