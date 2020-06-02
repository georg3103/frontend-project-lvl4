import { createSlice } from '@reduxjs/toolkit';

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: {
    message: '',
  },
  reducers: {
    setErrorMessage(state, action) {
      return action.payload;
    },
  },
});

export const actions = { ...errorMessageSlice.actions };

export const getErrorMessage = (state) => state.errorMessage;

export default errorMessageSlice.reducer;
