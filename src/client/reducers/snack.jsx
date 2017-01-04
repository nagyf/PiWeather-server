import {ADD_SNACK, CLOSE_SNACK} from '../actions/snack';

const initialState = {
    open: false,
    message: '',
    delay: 4000
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SNACK: {
            return Object.assign({}, state, {
                open: true,
                message: action.payload.message
            });
        }
        case CLOSE_SNACK: {
            return Object.assign({}, state, {
                open: false,
                message: ''
            });
        }
        default: {
            return state;
        }
    }
};
