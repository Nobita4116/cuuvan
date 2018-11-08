import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
// import {browserHistory} from 'react-router-dom';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const logger = createLogger();
// const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}