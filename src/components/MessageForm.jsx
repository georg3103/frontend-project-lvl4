import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getSelector } from '../redux';
import connect from '../connect';

const MessageForm = ({
  submitMessage,
}) => {
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

  const onKeyDown = (event) => {
    const message = get(formik, 'values.message', '');

    if (!message.length || (event.keyCode !== 13 && !event.shiftKey)) return;

    event.preventDefault();

    formik.handleSubmit();
  };
  return (
    <div role="presentation" onKeyDown={onKeyDown}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-100 p-3 position-relative"
      >
        <textarea
          className="w-100"
          id="message"
          name="message"
          type="text"
          placeholder="Message"
          ref={inputElement}
          onChange={formik.handleChange}
          value={formik.values.message}
          disabled={messageFormState === 'fetching'}
        />
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired,
};

export default connect()(MessageForm);
