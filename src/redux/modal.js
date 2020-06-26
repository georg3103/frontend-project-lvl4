/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    isShown: false,
  },
  reducers: {
    showModal(state, { payload }) {
      // modals can also use payload.id (remove, edit modals)
      state = { ...payload, isShown: true };
      return state;
    },
    hideModal(state) {
      // modals can also use payload.id (remove, edit modals)
      state = { type: null, isShown: false };
      return state;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
