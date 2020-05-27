import { connect } from 'react-redux';
import { actions } from './redux';

export default () => (component) => connect(null, { ...actions })(component);
