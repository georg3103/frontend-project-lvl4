import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { actions, getSelector } from '../redux';
import UserContext from '../context';

const MessageForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  const handleSubmit = async ({ message }, { resetForm, setStatus, setSubmitting }) => {
    const data = {
      data: {
        attributes: {
          message,
          user,
        },
      },
    };
    try {
      await dispatch(actions.submitMessage({ channelId: currentChannelId, data }));
      resetForm();
      if (inputElement.current) {
        inputElement.current.focus();
      }
    } catch (e) {
      setStatus(t('network'));
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
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
      <div className="text-danger">
        {formik.status}
        &nbsp;
      </div>
      <Form
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="d-flex align-self-center ml-2 mr-2">
          <textarea
            className="w-100 mr-2"
            id="message"
            name="message"
            type="text"
            placeholder={t('message')}
            style={textAreaStyle}
            ref={inputElement}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
          />
          <Button
            className="ml-auto"
            type="submit"
            disabled={formik.isSubmitting}
            variant="outline-success"
          >
            {t('send')}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
