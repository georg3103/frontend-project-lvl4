import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels } from './channels';
import currentChannelId, { actions as currentChannelIdActions, getCurrentChannelId } from './currentChannel';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import messageForm, { actions as messageFormActions, getMessageFormState } from './messageForm';
import modal, { actions as modalActions, getModalState } from './modal';
import channelAdding, { actions as channelAddingActions } from './channelAdding';
import user, { getUser } from './user';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  messageForm,
  modal,
  channelAdding,
  user,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
  ...messageFormActions,
  ...modalActions,
  ...channelAddingActions,
};

const selectors = {
  channels: getChannels,
  currentChannelId: getCurrentChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  messageFormState: getMessageFormState,
  modalState: getModalState,
  user: getUser,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
