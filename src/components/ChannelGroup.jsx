import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';
import PropTypes from 'prop-types';
import cn from 'classnames'

const ChannelGroup = ({
  setCurrentChannelId,
}) => {
	const channels = useSelector(getSelector('channels'));
	const currentChannelId = useSelector(getSelector('currentChannelId'));
	console.log('channels', channels, currentChannelId);
	return (
		<>
			{channels.map(({ id, name }) => {
				const isCurrentChannel = id === currentChannelId;
				const channelClass = cn({
					'active': isCurrentChannel,
				});
				return <div className={channelClass} key={id}>{name}</div>
		})}
		</>
	)
};

ChannelGroup.propTypes = {
	setCurrentChannelId: PropTypes.func.isRequired,
}

export default connect()(ChannelGroup);