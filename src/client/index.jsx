import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './core/root';
import './theme';
import './translations';

injectTapEventPlugin();

// Render the root of the application
const rootEl = document.getElementById('root');
ReactDOM.render(
    <Root />,
    rootEl
);

// Hot Module Reloading fix
if (module.hot) {
    module.hot.accept('./core/root', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const Root = require('./core/root').default;
        ReactDOM.render(
            <Root />,
            rootEl
        );
    });
}
