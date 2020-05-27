import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload.id;
    },
  },
});

export const actions = { ...currentChannelIdSlice.actions };

export const getCurrentChannelId = (state) => state.currentChannelId;

export default currentChannelIdSlice.reducer;
