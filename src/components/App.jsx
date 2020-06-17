import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
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
          <Router>
            <Route path="/">
              <Layout />
            </Route>
          </Router>
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
