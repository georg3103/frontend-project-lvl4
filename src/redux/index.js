import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels } from './channels';
import currentChannelId, { actions as currentChannelIdActions, getCurrentChannelId } from './currentChannel';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';
import messageForm, { actions as messageFormActions, getMessageFormState } from './messageForm';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  messageForm,
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
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
