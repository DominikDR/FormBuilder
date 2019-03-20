import { createStore } from 'redux';
import { combinedRedusers } from './reducers/index';

const store = createStore(
    combinedRedusers, window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle, no-undef
    && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle, no-undef
);
export default store;
