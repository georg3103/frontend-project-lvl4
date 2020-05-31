import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';

const Messages = () => {
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const messages = useSelector((state) => getSelector('messagesForChannel')(state, currentChannelId));
  return (
    <div className="w-100 flex-grow-1 p-3 overflow-auto">
      {messages.map(({
        id, message, user, date,
      }) => (
        <div key={id}>
          <div>{user}</div>
          <div>{message}</div>
          <div>{date}</div>
        </div>
      ))}
    </div>
  );
};

export default connect()(Messages);
