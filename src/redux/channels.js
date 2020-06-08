import { createSlice } from '@reduxjs/toolkit';
import find from 'lodash/find';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      state.push(action.payload.channel);
    },
    removeChannel(state, action) {
      return state.filter((ch) => ch.id !== action.payload.id);
    },
    editChannel(state, action) {
      const channel = find(state, (ch) => ch.id === action.payload.channel.id);
      channel.name = action.payload.channel.name;
    },
  },
});

export const actions = { ...channelsSlice.actions };

export const getChannels = (state) => state.channels;

export default channelsSlice.reducer;
