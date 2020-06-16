import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { openSocket } from '../helper';
import ChannelGroup from './ChannelGroup';
import Messages from './Messages';
import MessageForm from './MessageForm';
import { actions, getSelector } from '../redux';
import ChannelAddModal from './modals/ChannelAddModal';
import ChannelEditModal from './modals/ChannelEditModal';
import ChannelRemoveModal from './modals/ChannelRemoveModal';

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

const Layout = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(getSelector('modalState'));
  React.useEffect(() => {
    const socket = openSocket();

    socket.on('newMessage', (data) => {
      const message = get(data, 'data.attributes');
      dispatch(actions.addMessage({ message }));
    });

    socket.on('newChannel', (data) => {
      const channel = get(data, 'data.attributes');
      dispatch(actions.addChannel({ channel }));
      dispatch(actions.setCurrentChannelId({ id: channel.id }));
    });

    socket.on('renameChannel', (data) => {
      const { id, name } = get(data, 'data.attributes');
      dispatch(actions.editChannel({ id, name }));
    });

    socket.on('removeChannel', (data) => {
      const channel = get(data, 'data');
      dispatch(actions.removeChannel(channel));
    });

    // TODO: how to abort socket? AbortController?
    return function cleanup() {
      socket.disconnect();
    };
  }, [dispatch]);

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
      {modalState.isShown ? renderModal(modalState) : null}
    </div>
  );
};

renderModal.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Layout;
