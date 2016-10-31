import { LOGGED_IN } from './actions';
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

const reducers = combineReducers({
    user
});

export default reducers
