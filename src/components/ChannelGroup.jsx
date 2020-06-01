import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getSelector } from '../redux';
import connect from '../connect';

const ChannelGroup = ({ setCurrentChannelId, showModal }) => {
  const channels = useSelector(getSelector('channels'));
  const currentChannelId = useSelector(getSelector('currentChannelId'));
  return (
    <>
      <div>
        Channels
        <button type="button" onClick={() => showModal({ type: 'addModal' })}>+</button>
      </div>
      {channels.map(({ id, name }) => {
        const isCurrentChannel = id === currentChannelId;
        const channelClass = cn({
          'text-success': isCurrentChannel,
        });
        return (
          <div
            tabIndex="0"
            role="button"
            className={channelClass}
            onClick={() => setCurrentChannelId({ id })}
            onKeyDown={() => setCurrentChannelId({ id })}
            key={id}
          >
            {name}
          </div>
        );
      })}
    </>
  );
};

ChannelGroup.propTypes = {
  setCurrentChannelId: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default connect()(ChannelGroup);
