import axios from 'axios';

export const GET_VERSION = 'GET_VERSION';
export const GET_VERSION_SUCCESS = 'GET_VERSION_SUCCESS';
export const GET_VERSION_ERROR = 'GET_VERSION_ERROR';

export function getVersion(){
    return dispatch => {
        dispatch({type: GET_VERSION});

        return axios.get('/version')
            .then(res => dispatch(getVersionSuccess(res.data)))
            .catch(error => dispatch(getVersionError(error, error)));
    };
}

export function getVersionSuccess(data) {
    return {
        type: GET_VERSION_SUCCESS,
        payload: {
            version: data.version
        }
    };
}

/**
 * Dispatched after an unsuccessful load
 */
export function getVersionError(status, error) {
    return {
        type: GET_VERSION_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}
