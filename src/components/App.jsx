import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Layout from './Layout';

const App = () => {
	return (
		<Router>
			<Route path="/">
				<Layout/>
			</Route>
		</Router>
	)
};

export default App;