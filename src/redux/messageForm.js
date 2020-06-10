import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';
import { actions as errorMessageActions } from './errorMessage';

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
    await axios.post(routes.getChannelMessagesPath(channelId), data);
    dispatch(setActiveState());
    cb();
  } catch (err) {
    dispatch(setErrorState());
    let message;
    if (err.request) {
      message = err.request.status === 0 ? 'network' : 'access';
    } else {
      message = 'submit_message';
    }
    dispatch(errorMessageActions.setErrorMessage({ message }));
  }
};

export const actions = { ...messageFormSlice.actions, submitMessage };

export const getMessageFormState = (state) => state.messageForm;

export default messageFormSlice.reducer;
