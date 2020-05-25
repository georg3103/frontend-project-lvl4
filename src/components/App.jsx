import React from 'react';
import PropTypes from 'prop-types';

const App = ({ store }) => {
	console.log('store', store);
	const { channels } = store;
	return (
		<>
			<h2>Channels</h2>
			{
				channels.map(({id, name}) => <div key={id}>{name}</div>)
			}
		</>
	)
};

App.propTypes = {
  store: PropTypes.shape({
    channels: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    currentChannelId: PropTypes.number.isRequired,
  }).isRequired,
};

export default App;