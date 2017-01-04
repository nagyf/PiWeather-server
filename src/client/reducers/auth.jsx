import _ from 'lodash';
import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from '../actions/auth';
import PersistentStorage from '../util/storage';

const initialState = {};

if (typeof Storage === 'undefined') {
    // If there is no localstorage support, initialize the state with isAuthenticated=false
    initialState.isAuthenticated = false;
} else {
    // If there is localstorage support, check the storage if it has a JWT token
    const token = PersistentStorage.getJwtToken();
    const id = PersistentStorage.getCurrentUserId();
    initialState.isAuthenticated = _.isString(token);
    if (initialState.isAuthenticated) {
        initialState.token = token;
        initialState.id = id;
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                isAuthenticated: true,
                token: action.payload.token,
                id: action.payload.id
            });
        }
        case LOGIN_ERROR: {
            return Object.assign({}, state, {isAuthenticated: false, token: null, id: null});
        }
        case LOGOUT: {
            return Object.assign({}, state, {isAuthenticated: false, token: null, id: null});
        }
        default:
            return state;
    }
}
