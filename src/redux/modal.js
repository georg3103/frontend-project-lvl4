/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    data: {},
    isShown: false,
  },
  reducers: {
    showModal(state, { payload: { type, data } }) {
      state = { type, data, isShown: true };
      return state;
    },
    hideModal(state) {
      state = { type: null, data: {}, isShown: false };
      return state;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
