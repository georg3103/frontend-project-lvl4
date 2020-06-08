import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as errorMessageActions } from './errorMessage';
import { actions as currentChannelActions } from './currentChannel';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: 'none',
    modalState: 'active',
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...payload, modalState: state.modalState };
    },
    hideModal(state) {
      return { ...state, type: 'none' };
    },
    setActiveState(state) {
      return { ...state, modalState: 'active' };
    },
    setFetchingState(state) {
      return { ...state, modalState: 'fetching' };
    },
    setErrorState(state) {
      return { ...state, modalState: 'error' };
    },
  },
});

const {
  hideModal,
  setActiveState,
  setFetchingState,
  setErrorState,
} = modalSlice.actions;

const createChannel = (data, cb) => async (dispatch) => {
  dispatch(setFetchingState());

  try {
    await axios.post(routes.channelsPath(), data);
    dispatch(setActiveState());
    cb();
    dispatch(hideModal());
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

const renameChannel = (channelId, data, cb) => async (dispatch) => {
  dispatch(setFetchingState());

  try {
    await axios.patch(routes.channelPath(channelId), data);
    dispatch(setActiveState());
    cb();
    dispatch(hideModal());
  } catch (err) {
    dispatch(setErrorState());
    let message;
    if (err.request) {
      message = err.request.status === 0 ? 'network' : 'access';
    } else {
      message = 'edit_channel';
    }
    dispatch(errorMessageActions.setErrorMessage({ message }));
  }
};

const deleteChannel = (channelId) => async (dispatch, getState) => {
  dispatch(setFetchingState());

  try {
    await axios.delete(routes.channelPath(channelId));
    dispatch(setActiveState());
    dispatch(hideModal());
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

export const actions = {
  ...modalSlice.actions,
  createChannel,
  renameChannel,
  deleteChannel,
};

export const getModalState = (state) => state.modal;

export default modalSlice.reducer;
