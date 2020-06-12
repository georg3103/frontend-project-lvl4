import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { actions, getSelector } from '../../redux';
import Modal from '../Modal';

const ChannelAddModal = ({
  id,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const defaultChannelId = useSelector(getSelector('defaultChannelId'));

  const validationSchema = Yup.object({
    id: Yup.number().required('Required'),
  });

  const deleteChannel = async ({ channelId }, cb) => {
    try {
      await dispatch(actions.deleteChannel({ channelId }));
      cb();
      dispatch(actions.hideModal());
      dispatch(actions.setCurrentChannelId({ id: defaultChannelId }));
    } catch (err) {
      let message;
      if (err.request) {
        message = err.request.status === 0 ? 'network' : 'access';
      } else {
        message = 'add_channel';
      }
      dispatch(actions.errorMessageActions.setErrorMessage({ message }));
    }
  };

  const formik = useFormik({
    initialValues: {
      id,
    },
    validationSchema,
    onSubmit: (_, { resetForm }) => {
      deleteChannel({ channelId: id }, resetForm);
    },
  });

  return (
    <Modal title={t('remove_channel_title')}>
      <form onSubmit={formik.handleSubmit}>
        <button
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t('delete')}
        </button>
      </form>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ChannelAddModal;
