import { createSlice } from '@reduxjs/toolkit';
import genUser from '../helper';

const userSlice = createSlice({
  name: 'user',
  initialState: genUser(),
  reducers: {},
});

export const getUser = (state) => state.user;

export default userSlice.reducer;
