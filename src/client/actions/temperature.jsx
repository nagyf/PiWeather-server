import axios from 'axios';
import Api from './api';

export const GET_AGGREGATED_TEMP = 'GET_AGGREGATED_TEMP';
export const GET_AGGREGATED_TEMP_SUCCESS = 'GET_AGGREGATED_TEMP_SUCCESS';
export const GET_AGGREGATED_TEMP_ERROR = 'GET_AGGREGATED_TEMP_ERROR';

export function getAggregatedTemp(){
    return dispatch => {
        dispatch({type: GET_AGGREGATED_TEMP});

        return axios.get(Api.getUrl('/temperature/aggregated'))
            .then(res => dispatch(getAggregatedTempSuccess(res.data)))
            .catch(error => dispatch(getAggregatedTempError(error.response.status, error.response.data)));
    };
}

export function getAggregatedTempSuccess(data){
    return {
        type: GET_AGGREGATED_TEMP_SUCCESS,
        payload: {
            data
        }
    };
}

export function getAggregatedTempError(status, error){
    return {
        type: GET_AGGREGATED_TEMP_ERROR,
        payload: {
            status,
            error
        }
    };
}
