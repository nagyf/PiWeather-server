import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

/**
 * This is the root component, the top level component that is rendered with ReactDOM.
 * Initializes the Redux Provider and the React Router
 */
class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} key={Math.random()}/>
            </Provider>
        );
    }
}

export default Root;
