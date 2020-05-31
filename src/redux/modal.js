import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: 'none',
  reducers: {
    showModal(state, action) {
      return action.payload.type;
    },
    hideModal() {
      return 'none';
    },
  },
});

export const actions = { ...modalSlice.actions };

export const getModalState = (state) => state.modal;

export default modalSlice.reducer;
