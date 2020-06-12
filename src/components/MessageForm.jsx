import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { actions, getSelector } from '../redux';
import UserContext from '../context';

const MessageForm = () => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(getSelector('channels'));
  const inputElement = React.useRef(null);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const validationSchema = Yup.object({
    message: Yup.string().matches(/\S/).required('Required'),
  });

  const submitMessage = async ({ channelId, data }, cb) => {
    try {
      await dispatch(actions.submitMessage({ channelId, data }));
      cb();
    } catch (err) {
      let message;
      if (err.request) {
        message = err.request.status === 0 ? 'network' : 'access';
      } else {
        message = 'submit_message';
      }
      dispatch(actions.setErrorMessage({ message }));
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
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
      submitMessage({ channelId: currentChannelId, data }, onSubmit);
    },
  });

  const onKeyDown = (event) => {
    const message = get(formik, 'values.message', '');

    if (
      !message.length
      || (event.keyCode !== 13)
      || (event.keyCode === 13 && event.shiftKey)
    ) return;

    event.preventDefault();

    formik.handleSubmit();
  };

  const textAreaStyle = {
    resize: 'none',
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
          style={textAreaStyle}
          ref={inputElement}
          onChange={formik.handleChange}
          value={formik.values.message}
          disabled={formik.isSubmitting}
        />
      </form>
    </div>
  );
};

export default MessageForm;
