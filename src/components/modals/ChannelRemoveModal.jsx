import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { actions, selectors } from '../../redux';
import Modal from '../Modal';

const validationSchema = Yup.object({
  id: Yup.number().required('Required'),
});

const ChannelRemoveModal = ({
  id,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const defaultChannelId = useSelector(selectors.getDefaultChannelId);

  const handleSubmit = async (_, { resetForm, setStatus, setSubmitting }) => {
    try {
      await dispatch(actions.deleteChannel({ channelId: id }));
      resetForm();
      dispatch(actions.hideModal());
      dispatch(actions.setCurrentChannelId({ id: defaultChannelId }));
    } catch (e) {
      setStatus(t('network'));
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      id,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal title={t('remove_channel_title')}>
      <h6 className="text-danger">
        {formik.status}
        &nbsp;
      </h6>
      <Form onSubmit={formik.handleSubmit}>
        <Button
          className="ml-auto"
          type="submit"
          disabled={formik.isSubmitting}
          variant="outline-success"
        >
          {t('delete')}
        </Button>
      </Form>
    </Modal>
  );
};

ChannelRemoveModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ChannelRemoveModal;
