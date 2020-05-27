import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';
import PropTypes from 'prop-types';

const Messages = () => {
	const currentChannelId = useSelector(getSelector('currentChannelId'));
	const messages = useSelector((state) => getSelector('messagesForChannel')(state, currentChannelId));
	return (
		<>
			{messages.map(({ id, name }) => {
				return <div key={id}>{name}</div>
			})}
		</>
	)
};

Messages.propTypes = {
	setCurrentChannelId: PropTypes.func.isRequired,
}

export default connect()(Messages);