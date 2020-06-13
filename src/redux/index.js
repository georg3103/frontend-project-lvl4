import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels, getDefaultChannelId } from './channels';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import modal, { actions as modalActions, getModalState } from './modal';

export default combineReducers({
  channels,
  messages,
  modal,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

const selectors = {
  channels: getChannels,
  defaultChannelId: getDefaultChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  modalState: getModalState,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
