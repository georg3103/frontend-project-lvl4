import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels } from './channels';
import currentChannelId, { actions as currentChannelIdActions, getCurrentChannelId } from './currentChannel';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import messageForm, { actions as messageFormActions, getMessageFormState } from './messageForm';
import user, { getUser } from './user';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  messageForm,
  user,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
  ...messageFormActions,
};

const selectors = {
  channels: getChannels,
  currentChannelId: getCurrentChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
  messageFormState: getMessageFormState,
  user: getUser,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
