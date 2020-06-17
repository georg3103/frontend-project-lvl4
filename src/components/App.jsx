import React from 'react';
import { useTranslation } from 'react-i18next';
import useErrorBoundary from 'use-error-boundary';
import Layout from './Layout';


const App = () => {
  const { t } = useTranslation();
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  return (
    <>
      {didCatch ? (
        <p>
          {t('errorBoundary')}
          {error.message}
        </p>
      ) : (
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
