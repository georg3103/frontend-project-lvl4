import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions } from '../redux';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { list: channels, currentChannelId } = useSelector((state) => state.channels);

  const onEnter = (e, payload) => {
    if (e.key === 'Enter') {
      dispatch(actions.showModal(payload));
    }
  };

  return (
    <>
      <h4 className="d-flex flex-row justify-content-around pt-2">
        {t('channels')}
        <button type="button" className="btn btn-block" onClick={() => dispatch(actions.showModal({ type: 'addModal' }))}>+</button>
      </h4>
      <ButtonGroup vertical className="d-flex">
        {channels.map(({ id, name, removable }) => {
          const isCurrentChannel = id === currentChannelId;
          const variant = isCurrentChannel ? 'primary' : 'light';
          return removable ? (
            <Dropdown
              key={id}
              as={ButtonGroup}
            >
              <Button
                id="dropdown-basic-button"
                onClick={() => dispatch(actions.setCurrentChannelId({ id }))}
                onKeyDown={() => dispatch(actions.setCurrentChannelId({ id }))}
                variant={variant}
                className="col-sm text-left text-truncate"
              >
                {'# '}
                {name}
              </Button>
              <Dropdown.Toggle variant={variant} id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch(actions.showModal({ type: 'deleteModal', data: { id } }))}
                  onKeyDown={(e) => onEnter(e, { type: 'deleteModal', id })}
                >
                  {t('delete')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch(actions.showModal({ type: 'editModal', data: { id } }))}
                  onKeyDown={(e) => onEnter(e, { type: 'editModal', id })}
                >
                  {t('edit')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              key={id}
              variant={variant}
              onClick={() => dispatch(actions.setCurrentChannelId({ id }))}
              onKeyDown={() => dispatch(actions.setCurrentChannelId({ id }))}
              className="col-sm text-left text-truncate"
            >
              {'# '}
              {name}
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
};

export default ChannelsBox;
