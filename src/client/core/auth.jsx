import _ from 'lodash';
import axios from 'axios';
import { push } from 'react-router-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { logout } from '../actions/auth';
import PersistentStorage from '../util/storage';
import { addSnack } from '../actions/snack';
/**
 * Add Axios interceptors that automatically adds the Authorization header to every request if the JWT token is available in the store.
 * Also handles 401 Unauthorized responses and redirects the user to the login page.
 * @param store the redux store instance
 */
export function syncAxiosInterceptorsWithStore(store) {
    axios.interceptors.request.use(
        config => {
            store.dispatch(showLoading());
            // Do something before request is sent
            const token = store.getState().auth.token;
            if (_.isString(token)) {
                config.headers['Authorization'] = `JWT ${token}`;
            }
            return config;
        });

    // Intercept every HTTP response and look for HTTP 401 errors
    // If there is a HTTP 401 Unauthorized error then logout the user, forgot the JWT token and redirect
    // to the login page
    axios.interceptors.response.use(
        response => {
            store.dispatch(hideLoading());
            return response;
        },
        error => {
            store.dispatch(hideLoading());

            // Redirect the user to the login page.
            if (error.response.status === 401) {
                PersistentStorage.setJwtToken(null);
                PersistentStorage.setCurrentUserId(null);
                store.dispatch(logout());
                store.dispatch(push('/auth/login'));
            } else {
                store.dispatch(addSnack('Something bad happened on the server'));
            }
            return Promise.reject(error);
        });
}
