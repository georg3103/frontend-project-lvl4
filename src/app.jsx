import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import get from 'lodash/get';
import UserContext from './context';
import { CookieBuilder, openSocket } from './helper';
import { actions } from './redux';
import App from './components/App';

export default (store) => {
  const username = CookieBuilder.getUserName();

  const socket = openSocket();

  socket.on('newMessage', (data) => {
    const message = get(data, 'data.attributes');
    store.dispatch(actions.addMessage({ message }));
  });

  socket.on('newChannel', (data) => {
    const channel = get(data, 'data.attributes');
    store.dispatch(actions.addChannel({ channel }));
    store.dispatch(actions.setCurrentChannelId({ id: channel.id }));
  });

  socket.on('renameChannel', (data) => {
    const { id, name } = get(data, 'data.attributes');
    store.dispatch(actions.editChannel({ id, name }));
  });

  socket.on('removeChannel', (data) => {
    const channel = get(data, 'data');
    store.dispatch(actions.removeChannel(channel));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
