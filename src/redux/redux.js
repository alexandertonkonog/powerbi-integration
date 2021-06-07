import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './mainReducer';

export const reducers = combineReducers({
    main: mainReducer,
});

const middleware = applyMiddleware(thunk);

export const store = createStore(reducers, middleware);

window.store = store;