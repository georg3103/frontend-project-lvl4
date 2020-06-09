// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './i18n';
import App from './components/App';
import rootReducer from './redux';
import '../assets/application.scss';


i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { ...gon },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#chat'),
);
