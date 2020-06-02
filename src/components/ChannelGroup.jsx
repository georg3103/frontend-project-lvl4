import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getSelector } from '../redux';
import connect from '../connect';

const ChannelGroup = ({ setCurrentChannelId, showModal }) => {
  const channels = useSelector(getSelector('channels'));
  const currentChannelId = useSelector(getSelector('currentChannelId'));

  const onEnter = (e, id) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      showModal({ type: 'editModal', id });
    }
  };

  return (
    <>
      <div>
        Channels
        <button type="button" onClick={() => showModal({ type: 'addModal' })}>+</button>
      </div>
      {channels.map(({ id, name, removable }) => {
        const isCurrentChannel = id === currentChannelId;
        const channelClass = cn({
          'text-success': isCurrentChannel,
        });
        return (
          <div className="d-flex flex-row justify-content-between" key={id}>
            <div
              tabIndex="0"
              role="button"
              className={channelClass}
              onClick={() => setCurrentChannelId({ id })}
              onKeyDown={() => setCurrentChannelId({ id })}
            >
              {name}
            </div>
            {
              removable && (
              <>
                <div
                  tabIndex="0"
                  role="button"
                  onClick={() => showModal({ type: 'deleteModal', id })}
                  onKeyDown={() => showModal({ type: 'deleteModal', id })}
                >
                  delete
                </div>
                <div
                  tabIndex="0"
                  role="button"
                  onClick={() => showModal({ type: 'editModal', id })}
                  onKeyDown={(e) => onEnter(e, id)}
                >
                  edit
                </div>
              </>
              )
            }
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
