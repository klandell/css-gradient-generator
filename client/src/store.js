import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';

const middleware = [];

// Apply any dev only middleware
if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger').createLogger(); // eslint-disable-line global-require
    middleware.push(logger);
}

// Export our global redux store
export default createStore(reducer, applyMiddleware(...middleware));
