// eslint-disable-next-line import/no-unresolved
import gon from 'gon';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import resources from './i18n';
import rootReducer from './redux';
import '../assets/application.scss';
import { setUserName, getFakeName } from './helpers';
import app from './app';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      localStorage.debug = 'chat:*';
    }

    const fakeName = getFakeName();
    setUserName(fakeName);

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

    app(store);
  })
  .catch((err) => {
    console.log('Error on init');
    console.log(new Error(err));
  });
