import axios from 'axios';
import Api from './api';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

/**
 * Async action creator to load the users from the server.
 *
 * Will dispatch fetchUsersSuccess or fetchUsersError depending on the result of the call
 */
export function fetchUsers() {
    return dispatch => {
        dispatch({type: FETCH_USERS});

        return axios.get(Api.getUrl('users'))
            .then(res => dispatch(fetchUsersSuccess(res.data)))
            .catch(error => dispatch(fetchUsersError(error.status, error)));
    };
}

/**
 * Dispatched after a successful load
 * @param users an array of users that was loaded
 */
export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: {
            users: users
        }
    };
}

/**
 * Dispatched after an unsuccessful load
 */
export function fetchUsersError(status, error) {
    return {
        type: FETCH_USERS_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}

/**
 * An action creator that creates an async action to load a specific user from the server
 * @param id the id of the user
 */
export function fetchUser(id) {
    return dispatch => {
        dispatch({type: FETCH_USER});

        return axios.get(Api.getUrl(`users/${id}`))
            .then(res => dispatch(fetchUserSuccess(res.data)))
            .catch(error => dispatch(fetchUserError(error.status, error)));
    };
}

export function fetchUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
            user: user
        }
    };
}

export function fetchUserError(status, error) {
    return {
        type: FETCH_USER_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}

export function createUser(user) {
    return dispatch => {
        dispatch({type: CREATE_USER});

        return axios.post(Api.getUrl('users/'), user)
            .then(result => dispatch(createUserSuccess(result.data)))
            .catch(error => dispatch(createUserError(error.status, error)));
    };
}

export function createUserSuccess(user) {
    return {
        type: CREATE_USER_SUCCESS,
        payload: {
            user: user
        }
    };
}

export function createUserError(status, error) {
    return {
        type: CREATE_USER_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}

/**
 * Async action creator to edit the user
 */
export function editUser(user) {
    return dispatch => {
        dispatch({type: EDIT_USER});

        return axios.put(Api.getUrl(`users/${user._id}`), user)
            .then(() => dispatch(editUserSuccess()))
            .catch(error => dispatch(editUserError(error.status, error)));
    };
}

export function editUserSuccess() {
    return {
        type: EDIT_USER_SUCCESS
    };
}

export function editUserError(status, error) {
    return {
        type: EDIT_USER_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}

export function deleteUser(id) {
    return dispatch => {
        dispatch({type: DELETE_USER});

        return axios.delete(Api.getUrl(`users/${id}`))
            .then(() => dispatch(deleteUserSuccess(id)))
            .catch(error => dispatch(deleteUserError(error.status, error)));
    };
}

export function deleteUserSuccess(id) {
    return {
        type: DELETE_USER_SUCCESS,
        payload: {
            id: id
        }
    };
}

export function deleteUserError(status, error) {
    return {
        type: DELETE_USER_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}

export function changePassword(id, password) {
    return dispatch => {
        dispatch({type: CHANGE_PASSWORD});

        return axios.post(Api.getUrl('users/changePassword'), {id, password})
            .then(res => dispatch(changePasswordSuccess(res.data)))
            .catch(error => dispatch(changePasswordError(error.status, error)));
    };
}

export function changePasswordSuccess(user) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: {
            user: user
        }
    };
}

export function changePasswordError(status, error) {
    return {
        type: CHANGE_PASSWORD_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}
