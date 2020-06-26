import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../redux';

const MessagesBox = () => {
  const messages = useSelector((state) => selectors.getMessagesForChannel(state));

  return (
    <div className="d-flex flex-column flex-column-reverse flex-grow-1 p-3 overflow-auto">
      {messages.reduceRight((acc, {
        id, message, user, date,
      }) => acc.concat((
        <div key={id} className="card mb-4 w-100 border-0">
          <div className="col-sm-12">
            <div><b>{user}</b></div>
            <p className="mb-0">{message}</p>
            <p className="mb-2"><small className="text-muted">{date}</small></p>
          </div>
        </div>
      )), [])}
    </div>
  );
};

export default MessagesBox;
