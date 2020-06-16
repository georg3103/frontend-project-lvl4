import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import ChannelGroup from './ChannelGroup';
import Messages from './Messages';
import MessageForm from './MessageForm';
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
  const modalState = useSelector(getSelector('modalState'));

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
