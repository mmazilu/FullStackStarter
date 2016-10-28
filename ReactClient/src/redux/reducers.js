import { TOGGLE_VALUE } from './actions';

const initialState = {
    value: true
};

// Reducers
export default function application(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_VALUE:
            return Object.assign({}, state, {
                value: action.value
            });
        default:
            return state;
    }
}