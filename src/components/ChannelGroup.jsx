import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getSelector } from '../redux';
import connect from '../connect';


const ChannelGroup = ({ setCurrentChannelId, showModal }) => {
  const { t } = useTranslation();
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
      <h4 className="d-flex flex-row justify-content-around pt-2">
        {t('channels')}
        <button type="button" className="btn btn-block" onClick={() => showModal({ type: 'addModal' })}>+</button>
      </h4>
      {channels.map(({ id, name, removable }) => {
        const isCurrentChannel = id === currentChannelId;
        const channelClass = cn({
          'bg-primary': isCurrentChannel,
        }, ['nav-link btn btn-block nav-pills nav-fill d-flex flex-row justify-content-between']);
        return (
          <div className="d-flex flex-row justify-content-between" key={id}>
            <button
              type="button"
              tabIndex="0"
              className={channelClass}
              onClick={() => setCurrentChannelId({ id })}
              onKeyDown={() => setCurrentChannelId({ id })}
            >
              {name}
              {
              removable && (
              <>
                <div
                  tabIndex="0"
                  role="button"
                  onClick={() => showModal({ type: 'deleteModal', id })}
                  onKeyDown={() => showModal({ type: 'deleteModal', id })}
                >
                  {t('delete')}
                </div>
                <div
                  tabIndex="0"
                  role="button"
                  onClick={() => showModal({ type: 'editModal', id })}
                  onKeyDown={(e) => onEnter(e, id)}
                >
                  {t('edit')}
                </div>
              </>
              )
            }
            </button>
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
