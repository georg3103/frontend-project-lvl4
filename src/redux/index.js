import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels } from './channels';
import currentChannelId, { actions as currentChannelIdActions, getCurrentChannelId } from './currentChannel';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import messageForm, { actions as messageFormActions, getMessageFormState } from './messageForm';
import modal, { actions as modalActions, getModalState } from './modal';
import channelAdding, { actions as channelAddingActions } from './channelAdding';
import channelEditing, { actions as channelEditingActions } from './channelEditing';
import channelRemoving, { actions as channelRemovingActions } from './channelRemoving';
import errorMessage, { actions as errorMessageActions, getErrorMessage } from './errorMessage';
import user, { getUser } from './user';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  messageForm,
  modal,
  channelAdding,
  channelEditing,
  channelRemoving,
  errorMessage,
  user,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
  ...messageFormActions,
  ...modalActions,
  ...channelAddingActions,
  ...channelEditingActions,
  ...channelRemovingActions,
  ...errorMessageActions,
};

const selectors = {
  channels: getChannels,
  currentChannelId: getCurrentChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  messageFormState: getMessageFormState,
  modalState: getModalState,
  errorMessage: getErrorMessage,
  user: getUser,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
