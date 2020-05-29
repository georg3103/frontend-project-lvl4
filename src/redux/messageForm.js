import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';

const messageFormSlice = createSlice({
  name: 'messageForm',
  initialState: 'active',
  reducers: {
    setActiveState() {
      return 'active';
    },
    setFetchingState() {
      return 'fetching';
    },
    setErrorState() {
      return 'error';
    },
  },
});

const {
  setActiveState,
  setFetchingState,
  setErrorState,
} = messageFormSlice.actions;

// TODO: how does thunk bind with a store?
const submitMessage = (channelId, data, cb) => async (dispatch) => {
  dispatch(setFetchingState());

  try {
    await axios.post(routes.channelMessagesPath(channelId), data);
    dispatch(setActiveState());
    cb();
  } catch (err) {
    dispatch(setErrorState());
  }
};

export const actions = { ...messageFormSlice.actions, submitMessage };

export const getMessageFormState = (state) => state.messageForm;

export default messageFormSlice.reducer;
