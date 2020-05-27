import React from 'react';
import { useSelector } from 'react-redux';
import { getSelector } from '../redux';
import connect from '../connect';
import PropTypes from 'prop-types';

const Layout = ({
  addChannel,
}) => {
	console.log('addChannel', addChannel);
	const channels = useSelector(getSelector('channels'))
	console.log('channels', channels);
	return (
		<h1>Layout</h1>
	)
};

Layout.propTypes = {
	addChannel: PropTypes.func.isRequired,
}

export default connect()(Layout);