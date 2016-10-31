import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const loggerMiddleware = createLogger();

var initialState = {
    user: {
        isLoggedIn: false
    }
};

let store = createStore(
    reducers,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;