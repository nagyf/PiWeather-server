import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'
import { syncTranslationWithStore } from '../translations';
import { syncAxiosInterceptorsWithStore } from './auth';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../reducers';
import {syncSocketEventsWithStore} from './sockets';

// Apply the middleware to the store
const routingMiddleware = routerMiddleware(browserHistory);

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(thunk, promise, routingMiddleware, logger)
);

syncTranslationWithStore(store);
syncAxiosInterceptorsWithStore(store);
syncSocketEventsWithStore(store);

export default store;
