import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels, getDefaultChannelId } from './channels';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import modal, { actions as modalActions, getModalState } from './modal';
import errorMessage, { actions as errorMessageActions, getErrorMessage } from './errorMessage';

export default combineReducers({
  channels,
  messages,
  modal,
  errorMessage,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
  ...errorMessageActions,
};

const selectors = {
  channels: getChannels,
  defaultChannelId: getDefaultChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  modalState: getModalState,
  errorMessage: getErrorMessage,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
