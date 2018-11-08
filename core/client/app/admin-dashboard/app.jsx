import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux'

import {configureStore} from './store';
import AppRoutes from './routes';

const preloadState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(preloadState);

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
  document.getElementById('widgets-dashboard-container')
);