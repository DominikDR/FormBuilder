import { combineReducers } from 'redux';
import { formTreeReducer } from './formTree';

export const combinedRedusers = combineReducers({
    data: formTreeReducer,
});
