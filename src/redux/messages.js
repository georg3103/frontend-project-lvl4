import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as channelsActions } from './channels';

const submitMessage = createAsyncThunk(
  'messages/submitMessage',
  async ({ channelId, data }) => {
    await axios.post(routes.getChannelMessagesPath(channelId), data);
  },
);


const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload: { message } }) {
      state.push(message);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { id } }) => state
      .filter(({ channelId }) => channelId !== id),
    [submitMessage.fulfilled]: () => {},
    [submitMessage.rejected]: (err) => { throw new Error(err); },
  },
});

export const actions = { ...messagesSlice.actions, submitMessage };

export const getMessages = (state) => state.messages;

export const getMessagesForChannel = (state, channelId) => state.messages
  .filter((m) => m.channelId === channelId);

export default messagesSlice.reducer;
