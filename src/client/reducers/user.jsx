import _ from 'lodash';
import {
    FETCH_USERS_SUCCESS,
    FETCH_USER_SUCCESS,
    CREATE_USER_SUCCESS,
    ACTIVATE_USER,
    DEACTIVATE_USER,
    DELETE_USER_SUCCESS
} from '../actions/user';

export default (state = [], action) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS: {
            return [
                ...state,
                Object.assign({}, action.payload.user)
            ];
        }
        case ACTIVATE_USER: {
            const result = [];
            state.forEach(user => {
                if (user.id === action.payload.user._id) {
                    result.push(Object.assign({}, user, {active: true}));
                } else {
                    result.push(Object.assign({}, user));
                }
            });
            return result;
        }
        case DEACTIVATE_USER: {
            const result = [];
            state.forEach(user => {
                if (user._id === action.payload.user._id) {
                    result.push(Object.assign({}, user, {active: false}));
                } else {
                    result.push(Object.assign({}, user));
                }
            });
            return result;
        }
        case FETCH_USERS_SUCCESS: {
            return action.payload.users;
        }
        case FETCH_USER_SUCCESS: {
            const existing = _.filter(state, u => u._id !== action.payload.user._id);

            return [
                ...existing,
                Object.assign({}, action.payload.user)
            ];
        }
        case DELETE_USER_SUCCESS: {
            const result = _.filter(state, u => u._id !== action.payload.id);
            return [
                ...result
            ];
        }
    }
    return state;
};
