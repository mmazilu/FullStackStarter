import {
    LOGGED_IN,
    TOGGLE_MENU,
    GOT_USERS,
    GOT_TOPICS,
    TOGGLE_ADD_MENU
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

function topics(state = null, action) {
    switch (action.type) {
        case GOT_TOPICS:
            return Object.assign({}, state, {
                topicList: action.value
            });
        case TOGGLE_ADD_MENU:
            return Object.assign({}, state, {
                openAdd: action.value
            });
        default:
            return state;
    }
}


const reducers = combineReducers({
    user,
    main,
    users,
    topics
});

export default reducers
