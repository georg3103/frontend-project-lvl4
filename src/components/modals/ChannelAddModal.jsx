import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { actions, getSelector } from '../../redux';
import Modal from '../Modal';

const ChannelAddModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector(getSelector('channels'));
  const channelsNames = channels.map(({ name }) => name);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).matches(/\S/, 'not valid').notOneOf(channelsNames)
      .required('Required'),
  });

  const handleSubmit = async ({ name }, { resetForm, setStatus, setSubmitting }) => {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };

    try {
      await dispatch(actions.createChannel(data));
      resetForm();
      dispatch(actions.hideModal());
    } catch (e) {
      setStatus(t('network'));
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
    };
  }, [channels]);
  return (
    <Modal title={t('add_channel_title')}>
      <h6 className="text-danger">
        {formik.status}
        &nbsp;
      </h6>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="d-flex align-items-baseline">
          <Form.Label className="text-nowrap p-2">{t('new_channel_title')}</Form.Label>
          <Form.Control
            name="name"
            type="text"
            className="p-2 mr-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={!formik.isValid}
            disabled={formik.isSubmitting}
            required
            ref={inputRef}
          />
          <Button
            className="ml-auto"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            variant="outline-success"
          >
            {t('add')}
          </Button>
        </Form.Group>
        <Form.Control.Feedback type="invalid" className="d-block text-truncate">
          {formik.errors.name}
          &nbsp;
        </Form.Control.Feedback>
      </Form>
    </Modal>
  );
};

export default ChannelAddModal;
