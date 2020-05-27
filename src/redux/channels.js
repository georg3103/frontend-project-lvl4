import { createSlice } from '@reduxjs/toolkit';
import { find } from 'lodash';

const channelsSlice = createSlice({
	name: 'channels',
	initialState: [],
	reducers: {
		addChannel(state, action) {
			state.push(action.payload.channel);
		},
		removeChannel(state, action) {
			return state.filter((channel) => channel.id !== action.payload.id);
		},
		editChannel(state, action) {
			const channel = find(state, (channel) => channel.id === action.payload.channel.id);
			channel.name = action.payload.channel.name;
		}
	}
});

export const actions = { ...channelsSlice.actions };

export const getChannels = (state) => state.channels;

export default channelsSlice.reducer;