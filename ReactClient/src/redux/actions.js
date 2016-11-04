
// Action types
export const LOGGED_IN = 'LOGGED_IN';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const GOT_USERS = 'GOT_USERS';
export const GOT_TOPICS = 'GOT_TOPICS';
export const TOGGLE_ADD_MENU = 'TOGGLE_ADD_MENU';

// Action creators

export function logIn(value) {
    return {
        type: LOGGED_IN,
        value
    };
}

export function toggleMenu(value) {
    return {
        type: TOGGLE_MENU,
        value
    };
}

export function gotUsers(value) {
    return {
        type: GOT_USERS,
        value
    };
}

export function gotTopics(value) {
    return {
        type: GOT_TOPICS,
        value
    };
}

export function toggleAdd(value) {
    return {
        type: TOGGLE_ADD_MENU,
        value
    };
}

