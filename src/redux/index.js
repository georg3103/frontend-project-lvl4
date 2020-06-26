/* eslint-disable no-shadow */
import { combineReducers, createSelector } from '@reduxjs/toolkit';

import channels, { actions as channelsActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import modal, { actions as modalActions } from './modal';

export default combineReducers({
  channels,
  messages,
  modal,
});

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

const getMessagesForChannel = createSelector(
  (state) => state.messages,
  (state) => state.channels.currentChannelId,
  (messages, currentChannelId) => messages
    .filter((m) => m.channelId === currentChannelId),
);

const getDefaultChannelId = createSelector(
  (state) => state.channels.channels,
  (channels) => {
    const [{ id }] = channels;
    return id;
  },
);

export const selectors = {
  getDefaultChannelId,
  getMessagesForChannel,
};
