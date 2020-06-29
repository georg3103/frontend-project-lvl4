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
  },
});

export const actions = { ...messagesSlice.actions, submitMessage };

export default messagesSlice.reducer;
