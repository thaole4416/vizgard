import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import features from './reducers/features';
import objects from './reducers/objects';
import socket from './reducers/socket';
import serverInfo from './reducers/serverInfo';
import notification from './reducers/notification';
import datasets from './reducers/datasets';

// const logger = createLogger({
//     // ...options
// });
const reducers = combineReducers({
    datasets,
    features,
    notification,
    objects,
    serverInfo,
    socket,
});
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(reducers, composeEnhancers(applyMiddleware()));

export default reduxStore;
