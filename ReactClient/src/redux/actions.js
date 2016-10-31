
// Action types
export const LOGGED_IN = 'LOGGED_IN';

// Action creators

export function logIn(value) {
    return {
        type: LOGGED_IN,
        value
    };
}
