import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { getSelector } from '../redux';
import connect from '../connect';
import Modal from './Modal';

const ChannelAddModal = ({
  renameChannel,
  id,
}) => {
  const { t } = useTranslation();
  const modalState = useSelector(getSelector('modalState'));
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { name } = values;
      const data = {
        data: {
          attributes: {
            name,
          },
        },
      };
      renameChannel(id, data, resetForm);
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
          ref={inputElement}
          onChange={formik.handleChange}
          value={formik.values.name}
          disabled={modalState === 'fetching'}
        />
      </form>
    </Modal>
  );
};

ChannelAddModal.propTypes = {
  renameChannel: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect()(ChannelAddModal);
