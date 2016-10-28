
// Action types
export const TOGGLE_VALUE = 'TOGGLE_VALUE';

// Action creators

export function toggleValue(value) {
    return {
        type: TOGGLE_VALUE,
        value
    };
}
