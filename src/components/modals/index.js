import React from 'react';
import ChannelAddModal from './ChannelAddModal';
import ChannelEditModal from './ChannelEditModal';
import ChannelRemoveModal from './ChannelRemoveModal';

const modalMapper = {
  addModal: () => React.createElement(ChannelAddModal),
  editModal: (id) => React.createElement(ChannelEditModal, { id }),
  deleteModal: (id) => React.createElement(ChannelRemoveModal, { id }),
};

export default ({ type, id }) => {
  if (!modalMapper[type]) return null;
  const Component = modalMapper[type](id);
  return Component;
};
