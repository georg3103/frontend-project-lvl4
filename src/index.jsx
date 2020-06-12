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
import { generateUser } from './helper';
import UserContext from './context';


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

const userName = generateUser();

const preloadedState = {
  channels: {
    channels: gon.channels,
    currentChannelId: gon.currentChannelId,
  },
  messages: gon.messages,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

ReactDOM.render(
  <Provider store={store}>
    <UserContext.Provider value={userName}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.querySelector('#chat'),
);
