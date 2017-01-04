import axios from 'axios';
import Api from './api';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

/**
 * Login action. Called when the user tries to log in the application with an email and a password
 * @returns {function(*): (Promise|Promise<R>)} an async action that will dispatch loginSuccess or loginFailure
 */
export function login(email, password) {
    return dispatch => {
        dispatch({type: LOGIN});

        const data = {
            email,
            password
        };

        return axios.post(Api.getUrl('auth/login'), data)
            .then(res => dispatch(loginSuccess(res.data.token, res.data.id)))
            .catch(error => dispatch(loginError(error.status, error)));
    }
}

/**
 * Called when the user successfully logged in
 * @param token the JWT token that the user received after the login
 * @param id the ID of the current user
 */
export function loginSuccess(token, id) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
            id
        }
    };
}

/**
 * Called in case of an unsuccessful login attempt.
 */
export function loginError(status, error) {
    return {
        type: LOGIN_ERROR,
        payload: {
            status,
            error
        }
    };
}

/**
 * This action is dispatched in case the user tries to log out of the application.
 */
export function logout() {
    return {
        type: LOGOUT
    };
}
