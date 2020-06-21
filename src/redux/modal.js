import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    isShown: false,
  },
  reducers: {
    showModal(state, { payload }) {
      state = { ...payload, isShown: true };
      return state;
    },
    hideModal(state) {
      state.isShown = false;
    },
  },
});

export const actions = {
  ...modalSlice.actions,
};

export const getModalState = (state) => state.modal;

export default modalSlice.reducer;
