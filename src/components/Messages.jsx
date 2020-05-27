import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';

const Messages = () => {
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const messages = useSelector((state) => getSelector('messagesForChannel')(state, currentChannelId));
  return (
    <>
      {messages.map(({ id, name }) => <div key={id}>{name}</div>)}
    </>
  );
};

export default connect()(Messages);
