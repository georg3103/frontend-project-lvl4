import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import routes from '../routes';
import { actions as modalActions } from './modal';
import { actions as currentChannelActions } from './currentChannel';
import { actions as errorMessageActions } from './errorMessage';

const channelRemovingSlice = createSlice({
  name: 'channelRemoving',
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
} = channelRemovingSlice.actions;

// TODO: how does thunk bind with a store?
const deleteChannel = (channelId) => async (dispatch, getState) => {
  dispatch(setFetchingState());

  try {
    await axios.delete(routes.channelPath(channelId));
    dispatch(setActiveState());
    dispatch(modalActions.hideModal());
    const { channels } = getState();
    const [{ id }] = channels;
    dispatch(currentChannelActions.setCurrentChannelId({ id }));
  } catch (err) {
    dispatch(setErrorState());
    let message;
    if (err.request) {
      message = err.request.status === 0 ? 'network' : 'access';
    } else {
      message = 'remove_channel';
    }
    dispatch(errorMessageActions.setErrorMessage({ message }));
  }
};

export const actions = { ...channelRemovingSlice.actions, deleteChannel };

export default channelRemovingSlice.reducer;
