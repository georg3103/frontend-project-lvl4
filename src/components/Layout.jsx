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
import ChannelEditModal from './ChannelEditModal';
import ChannelRemoveModal from './ChannelRemoveModal';

const modalMapper = {
  addModal: () => React.createElement(ChannelAddModal),
  editModal: (id) => React.createElement(ChannelEditModal, { id }),
  deleteModal: (id) => React.createElement(ChannelRemoveModal, { id }),
};

const renderModal = ({ type, id }) => {
  if (!modalMapper[type]) return null;
  const Component = modalMapper[type](id);
  return Component;
};

const Layout = ({
  addChannel,
  editChannel,
  removeChannel,
  addMessage,
}) => {
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

    socket.on('renameChannel', (data) => {
      const channel = get(data, 'data.attributes');
      editChannel({ channel });
    });

    socket.on('removeChannel', (data) => {
      const channel = get(data, 'data');
      removeChannel(channel);
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
  editChannel: PropTypes.func.isRequired,
  removeChannel: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

renderModal.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect()(Layout);
