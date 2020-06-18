import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';

const MessagesBox = () => {
  const container = React.useRef(null);
  const { currentChannelId } = useSelector(getSelector('channels'));
  const messages = useSelector((state) => getSelector('messagesForChannel')(state, currentChannelId));

  React.useEffect(() => {
    container.current.scrollTo(0, container.current.scrollHeight);
  }, [messages]);
  return (
    <div ref={container} className="w-100 flex-grow-1 p-3 overflow-auto">
      {messages.map(({
        id, message, user, date,
      }) => (
        <div key={id} className="card mb-4 w-100 border-0">
          <div className="col-sm-12">
            <div><b>{user}</b></div>
            <p className="mb-0">{message}</p>
            <p className="mb-2"><small className="text-muted">{date}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
