import React from 'react';
import connect from '../connect';
import PropTypes from 'prop-types';

import ChannelGroup from './ChannelGroup';

const Layout = ({
  addChannel,
}) => {
	return (
		<div className="container h-100">
			<div className="row h-100 border">
				<div className="col-sm-4 border-right">
					<ChannelGroup/>
				</div>
				<div className="col-sm-8">col-sm-8</div>
			</div>
		</div>
	)
};

Layout.propTypes = {
	addChannel: PropTypes.func.isRequired,
}

export default connect()(Layout);