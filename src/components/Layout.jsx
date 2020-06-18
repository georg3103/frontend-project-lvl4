import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import ChannelGroup from './ChannelGroup';
import MessagesBox from './MessagesBox';
import MessageForm from './MessageForm';
import renderModal from './modals';

const Layout = () => {
  const modalState = useSelector(getSelector('modalState'));

  return (
    <>
      {modalState.isShown && renderModal(modalState)}
      <div className="container h-100">
        <div className="row h-100 border">
          <div className="col-sm-4 border-right">
            <ChannelGroup />
          </div>
          <div className="col-sm-8 h-100">
            <div className="row h-100 flex-column flex-nowrap">
              <MessagesBox />
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

renderModal.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Layout;
