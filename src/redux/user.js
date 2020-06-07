import { createSlice } from '@reduxjs/toolkit';
import { generateUser } from '../helper';

const userSlice = createSlice({
  name: 'user',
  initialState: generateUser(),
  reducers: {},
});

export const getUser = (state) => state.user;

export default userSlice.reducer;
