import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';
import { actions as modalActions } from './modal';
import { actions as errorMessageActions } from './errorMessage';

const channelAddingSlice = createSlice({
  name: 'channelAdding',
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
} = channelAddingSlice.actions;

// TODO: how does thunk bind with a store?
const createChannel = (data, cb) => async (dispatch) => {
  dispatch(setFetchingState());

  try {
    await axios.post(routes.channelsPath(), data);
    dispatch(setActiveState());
    cb();
    dispatch(modalActions.hideModal());
  } catch (err) {
    dispatch(setErrorState());
    let message;
    if (err.request) {
      message = err.request.status === 0 ? 'network' : 'access';
    } else {
      message = 'add_channel';
    }
    dispatch(errorMessageActions.setErrorMessage({ message }));
  }
};

export const actions = { ...channelAddingSlice.actions, createChannel };

export default channelAddingSlice.reducer;
