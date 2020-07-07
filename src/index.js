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
  .catch((err) => {
    console.log('crashed on i18n init:');
    throw new Error(err);
  })
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      localStorage.debug = 'chat:*';
    }

    if (!getUserName()) {
      const userName = getFakeName();
      setUserName(userName);
    }

    const preloadedState = {
      channels: {
        list: gon.channels,
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
    console.log(err.message);
  });
