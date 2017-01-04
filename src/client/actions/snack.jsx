export const ADD_SNACK = 'ADD_SNACK';
export const CLOSE_SNACK = 'CLOSE_SNACK';

export function addSnack(message) {
    return {
        type: ADD_SNACK,
        payload: {
            message
        }
    };
}

export function closeSnack() {
    return {
        type: CLOSE_SNACK
    };
}
