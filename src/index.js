import gon from 'gon';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import resources from './i18n';
import rootReducer from './redux';
import '../assets/application.scss';
import { getUserName, setUserName, getFakeName } from './helpers';
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

    if (!getUserName()) {
      const fakeName = getFakeName();
      setUserName(fakeName);
    }

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
  }, (err) => {
    console.log('crashed on i18n init:');
    throw new Error(err);
  })
  .catch((err) => {
    console.log(err.message);
  });
