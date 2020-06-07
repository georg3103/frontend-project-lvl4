import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { actions, getSelector } from '../../redux';
import Modal from '../Modal';

const ChannelAddModal = ({
  id,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalState = useSelector(getSelector('modalState'));
  return (
    <Modal title={t('remove_channel_title')}>
      <button
        type="button"
        onClick={() => dispatch(actions.deleteChannel(id))}
        disabled={modalState === 'fetching'}
      >
        {t('delete')}
      </button>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ChannelAddModal;
