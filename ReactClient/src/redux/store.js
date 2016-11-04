import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const loggerMiddleware = createLogger();

var initialState = {
    user: {
        isLoggedIn: false
    },
    main: {
        menuOpen: false
    },
    users:{
        userList:null
    },
    topics:{
        topicList:null,
        openAdd: false
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