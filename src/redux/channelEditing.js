import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';
import { actions as modalActions } from './modal';

const channelEditingSlice = createSlice({
  name: 'channelEditing',
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
} = channelEditingSlice.actions;

// TODO: how does thunk bind with a store?
const renameChannel = (channelId, data, cb) => async (dispatch) => {
  dispatch(setFetchingState());

  try {
    await axios.patch(routes.channelPath(channelId), data);
    dispatch(setActiveState());
    cb();
    dispatch(modalActions.hideModal());
  } catch (err) {
    dispatch(setErrorState());
  }
};

export const actions = { ...channelEditingSlice.actions, renameChannel };

export default channelEditingSlice.reducer;
