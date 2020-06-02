import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      add_channel: 'Error in adding channel.',
      remove_channel: 'Error in removing channel.',
      edit_channel: 'Error in editing channel.',
      submit_message: 'Error in sending message.',
      channels: 'Channels',
      network: 'Network Error',
      access: 'Access Error',
      description: 'Description',
      close: 'close',
      edit: 'edit',
      delete: 'delete',
      message: 'Message',
      new_channel_title: 'New channel',
      add_channel_title: 'Add channel',
      edit_channel_title: 'Edit channel',
      remove_channel_title: 'Remove channel',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
