import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { getSelector } from '../redux';
import connect from '../connect';

const MessageForm = ({
  submitMessage,
}) => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const messageFormState = useSelector(getSelector('messageFormState'));
  const inputElement = React.useRef(null);
  React.useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  const user = useSelector(getSelector('user'));
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { message } = values;
      const data = {
        data: {
          attributes: {
            message,
            user,
          },
        },
      };
      const onSubmit = () => {
        resetForm();
        if (inputElement.current) {
          inputElement.current.focus();
        }
      };
      submitMessage(currentChannelId, data, onSubmit);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-100 p-3 position-relative"
    >
      <label htmlFor="message">{t('message')}</label>
      <input
        id="message"
        name="message"
        type="text"
        ref={inputElement}
        onChange={formik.handleChange}
        value={formik.values.message}
        disabled={messageFormState === 'fetching'}
      />
    </form>
  );
};

MessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default connect()(MessageForm);
