import React from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import connect from '../connect';
import ChannelGroup from './ChannelGroup';
import Messages from './Messages';
import MessageForm from './MessageForm';
import { getSelector } from '../redux';
import ChannelAddModal from './ChannelAddModal';

const modalMapper = {
  addModal: ChannelAddModal,
};

const renderModal = (type) => {
  const Component = modalMapper[type];

  if (!Component) return null;

  return <Component />;
};

const Layout = ({
  // eslint-disable-next-line no-unused-vars
  addChannel,
  addMessage,
}) => {
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  const modalState = useSelector(getSelector('modalState'));

  React.useEffect(() => {
    const socket = openSocket(process.env.PORT);

    socket.on('newMessage', (data) => {
      const message = get(data, 'data.attributes');
      addMessage({ message });
    });

    socket.on('newChannel', (data) => {
      const channel = get(data, 'data.attributes');
      addChannel({ channel });
    });
  }, []);

  return (
    <div className="container h-100">
      <div className="row h-100 border">
        <div className="col-sm-4 border-right">
          <ChannelGroup />
        </div>
        <div className="col-sm-8 h-100">
          <div className="row h-100 flex-column flex-nowrap">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
      {renderModal(modalState)}
    </div>
  );
};

Layout.propTypes = {
  addChannel: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

export default connect()(Layout);
