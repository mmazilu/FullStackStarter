import {
    LOGGED_IN,
    TOGGLE_MENU,
    GOT_USERS
} from './actions';
import {combineReducers} from 'redux'

// Reducers
function user(state = null, action) {
    switch (action.type) {
        case LOGGED_IN:
            return Object.assign({}, state, {isLoggedIn:true}, {
                name: action.value
            });
        default:
            return state;
    }
}

function main(state = null, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: action.value
            });
        default:
            return state;
    }
}

function users(state = null, action) {
    switch (action.type) {
        case GOT_USERS:
            return Object.assign({}, state, {
                userList: action.value
            });
        default:
            return state;
    }
}

const reducers = combineReducers({
    user,
    main,
    users
});

export default reducers
