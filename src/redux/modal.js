import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...payload };
    },
    hideModal(state) {
      return { ...state, type: null };
    },
  },
});

export const actions = {
  ...modalSlice.actions,
};

export const getModalState = (state) => state.modal;

export default modalSlice.reducer;
