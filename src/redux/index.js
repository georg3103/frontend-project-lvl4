import { combineReducers } from 'redux';

import channels, { actions as channelsActions, getChannels } from './channels';
import currentChannelId, { actions as currentChannelIdActions, getCurrentChannelId } from './currentChannel';
import messages, { actions as messagesActions, getMessages, getMessagesForChannel } from './messages';


export default combineReducers({
  channels,
  currentChannelId,
  messages,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
};

const selectors = {
  channels: getChannels,
  currentChannelId: getCurrentChannelId,
  messages: getMessages,
  messagesForChannel: getMessagesForChannel,
};

const getSelector = (type) => selectors[type];

export {
  actions,
  getSelector,
};
