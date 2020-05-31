import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';
import { actions as modalActions } from './modal';

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
  }
};

export const actions = { ...channelAddingSlice.actions, createChannel };

export default channelAddingSlice.reducer;
