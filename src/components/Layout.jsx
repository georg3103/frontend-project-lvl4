import React from 'react';
import PropTypes from 'prop-types';
import connect from '../connect';

import ChannelGroup from './ChannelGroup';
import Messages from './Messages';
import MessageForm from './MessageForm';

const Layout = ({
  // eslint-disable-next-line no-unused-vars
  addChannel,
}) => (
  <div className="container h-100">
    <div className="row h-100 border">
      <div className="col-sm-4 border-right">
        <ChannelGroup />
      </div>
      <div className="col-sm-8">
        <Messages />
        <MessageForm />
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  addChannel: PropTypes.func.isRequired,
};

export default connect()(Layout);
