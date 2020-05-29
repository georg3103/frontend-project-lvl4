import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';

const Messages = () => {
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const messages = useSelector((state) => getSelector('messagesForChannel')(state, currentChannelId));
  console.log('messages', messages);
  return (
    <>
      {messages.map(({ id, message }) => <div key={id}>{message}</div>)}
    </>
  );
};

export default connect()(Messages);
