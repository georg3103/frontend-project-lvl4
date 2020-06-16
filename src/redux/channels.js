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
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, { payload: { channel } }) {
      state.channels.push(channel);
    },
    removeChannel(state, { payload: { id } }) {
      return {
        ...state,
        channels: state.channels.filter((ch) => ch.id !== id),
      };
    },
    editChannel(state, { payload: { id, name } }) {
      const channel = find(state.channels, (ch) => ch.id === id);
      channel.name = name;
    },
    setCurrentChannelId(state, { payload: { id } }) {
      return { ...state, currentChannelId: id };
    },
  },
  extraReducers: {
    [createChannel.fulfilled]: () => {},
    [createChannel.rejected]: (err) => { throw new Error(err); },
    [renameChannel.fulfilled]: () => {},
    [renameChannel.rejected]: (err) => { throw new Error(err); },
    [deleteChannel.fulfilled]: () => {},
    [deleteChannel.rejected]: (err) => { throw new Error(err); },
  },
});

export const actions = {
  ...channelsSlice.actions,
  createChannel,
  renameChannel,
  deleteChannel,
};

export const getChannels = (state) => state.channels;
export const getDefaultChannelId = (state) => {
  const [{ id }] = state.channels.channels;
  return id;
};

export default channelsSlice.reducer;
