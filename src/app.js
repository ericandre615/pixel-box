import React from 'react';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import getProp from 'lodash/get';
import Routes from './routes';
import reducers from './state';
import { getSession, setSession } from './state/session-storage';
import { INVALIDATE_SESSION } from './state/action-types';

// global styles
import './app.css';

const history = createHistory();

// check sessionStorage and hydrate state to persist across reloads
const stateKey = 'appState';

const configureStore = () => {
  const middlewares = [thunk, routerMiddleware(history)];
  const initialState = getSession(stateKey);

  if (process.env.REACT_APP_LOG_LEVEL === 'debug' ||
    (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')) {
    middlewares.push(createLogger());
  }

  const appReducer = combineReducers({
    ...reducers,
    router: routerReducer,
  });

  const rootReducer = (state, action) => {
    const nextState = (action.type === INVALIDATE_SESSION) ? { appVersion: state.appVersion } : state;
    return appReducer(nextState, action);
  };

  const composeEnhancers = (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || // eslint-disable-line no-underscore-dangle
    compose : compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)));
};

const store = configureStore();

// listen for state changes and sync to storage
const syncStateToStorage = () => setSession(stateKey, store.getState());

// Axios response interceptor
axios.interceptors.response.use(
  response => response,
  (error) => {
    const statusCode = getProp(error, 'response.status');
    const { pathname } = history.location;

    if (statusCode === 401) {
      if (pathname !== '/') {
        // invalidate session and set login error message
        // store.dispatch(invalidateSession());
        // store.dispatch(setError(LOGIN, 'Your session has expired. Please sign in again.'));
      }

      return Promise.reject(error);
    }
    if (statusCode >= 500 || !statusCode) {
      return Promise.reject(new Error('An unexpected error has occurred.'));
    }

    return Promise.reject(error);
  });

store.subscribe(syncStateToStorage);

export default () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Routes />
    </Router>
  </Provider>
);
