import React from 'react';
import ChannelAddModal from './ChannelAddModal';
import ChannelEditModal from './ChannelEditModal';
import ChannelRemoveModal from './ChannelRemoveModal';

const modalMapper = {
  addModal: () => <ChannelAddModal />,
  editModal: (modalData) => <ChannelEditModal id={modalData.id} />,
  deleteModal: (modalData) => <ChannelRemoveModal id={modalData.id} />,
};

export default ({ type, data }) => {
  if (!modalMapper[type]) return null;
  const Component = modalMapper[type](data);
  return Component;
};
