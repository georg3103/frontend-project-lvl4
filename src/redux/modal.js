import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    isShown: false,
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, isShown: true };
    },
    hideModal(state) {
      return { ...state, isShown: false };
    },
  },
});

export const actions = {
  ...modalSlice.actions,
};

export const getModalState = (state) => state.modal;

export default modalSlice.reducer;
