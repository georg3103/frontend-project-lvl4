import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions, getSelector } from '../redux';

const ChannelGroup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector(getSelector('channels'));

  const nameStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const onEnter = (e, payload) => {
    if (e.keyCode === 13) {
      dispatch(actions.showModal(payload));
    }
  };

  return (
    <>
      <h4 className="d-flex flex-row justify-content-around pt-2">
        {t('channels')}
        <button type="button" className="btn btn-block" onClick={() => dispatch(actions.showModal({ type: 'addModal' }))}>+</button>
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
              onClick={() => dispatch(actions.setCurrentChannelId({ id }))}
              onKeyDown={() => dispatch(actions.setCurrentChannelId({ id }))}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm text-left" style={nameStyle}>
                    {'# '}
                    {name}
                  </div>
                  {
                    removable && (
                    <>
                      <div
                        className="col-sm"
                        tabIndex="0"
                        role="button"
                        onClick={() => dispatch(actions.showModal({ type: 'deleteModal', id }))}
                        onKeyDown={(e) => onEnter(e, { type: 'deleteModal', id })}
                      >
                        {t('delete')}
                      </div>
                      <div
                        className="col-sm"
                        tabIndex="0"
                        role="button"
                        onClick={() => dispatch(actions.showModal({ type: 'editModal', id }))}
                        onKeyDown={(e) => onEnter(e, { type: 'editModal', id })}
                      >
                        {t('edit')}
                      </div>
                    </>
                    )
                  }
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ChannelGroup;
