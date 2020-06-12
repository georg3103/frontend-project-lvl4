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
  const { channels } = useSelector(getSelector('channels'));
  const channelsNames = channels.map(({ name }) => name);

  const validationSchema = Yup.object({
    name: Yup.string().notOneOf(channelsNames).required('Required'),
  });

  const renameChannel = async ({ channelId, data }, cb) => {
    try {
      await dispatch(actions.renameChannel({ channelId, data }));
      cb();
      dispatch(actions.hideModal());
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
      name: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { name } = values;
      const data = {
        data: {
          attributes: {
            name,
          },
        },
      };
      renameChannel({ channelId: id, data }, resetForm);
    },
  });
  const inputElement = React.useRef(null);
  React.useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  return (
    <Modal title={t('edit_channel_title')}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <label htmlFor="name">{t('edit_channel_title')}</label>
        <input
          id="name"
          name="name"
          type="text"
          className="ml-2"
          ref={inputElement}
          onChange={formik.handleChange}
          value={formik.values.name}
          disabled={formik.isSubmitting}
        />
      </form>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ChannelAddModal;
