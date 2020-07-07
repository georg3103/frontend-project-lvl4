/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import find from 'lodash/find';
import axios from 'axios';
import routes from '../routes';

const createChannel = createAsyncThunk(
  'channels/createChannel',
  async ({ data }) => {
    await axios.post(routes.getChannelsPath(), { data });
  },
);

const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ channelId, data }) => {
    await axios.patch(routes.getChannelPath(channelId), data);
  },
);

const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async ({ channelId }) => {
    await axios.delete(routes.getChannelPath(channelId));
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, { payload: { channel } }) {
      state.list.push(channel);
    },
    removeChannel(state, { payload: { id } }) {
      state.list = state.list.filter((ch) => ch.id !== id);
    },
    editChannel(state, { payload: { id, name } }) {
      const channel = find(state.list, (ch) => ch.id === id);
      channel.name = name;
    },
    setCurrentChannelId(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
  },
});

export const actions = {
  ...channelsSlice.actions,
  createChannel,
  renameChannel,
  deleteChannel,
};

export default channelsSlice.reducer;
