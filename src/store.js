import { createStore } from 'redux';
import { combineReducers } from './reducers/index';

const store = createStore(
    combineReducers, window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle, no-undef
    && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle, no-undef
);
export default store;
