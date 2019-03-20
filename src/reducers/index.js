import { combineReducers } from 'redux';
import { formTreeReducer } from './formTree';

combineReducers({
    formTree: formTreeReducer,
});

export { combineReducers };
