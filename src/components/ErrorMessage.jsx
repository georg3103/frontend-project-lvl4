import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { getSelector } from '../redux';

const ErrorMessage = () => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(true);
  const { message: errorMessage } = useSelector(getSelector('errorMessage'));
  const errorMessageStyling = {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, 0)',
  };

  return (
    <Alert style={errorMessageStyling} show={show} variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      <p>
        {t('description')}
        :
        {errorMessage}
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-danger">
          Close
        </Button>
      </div>
    </Alert>
  );
};

export default ErrorMessage;
