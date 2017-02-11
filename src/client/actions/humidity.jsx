import axios from 'axios';
import Api from './api';

export const GET_AGGREGATED_HUMIDITY = 'GET_AGGREGATED_HUMIDITY';
export const GET_AGGREGATED_HUMIDITY_SUCCESS = 'GET_AGGREGATED_HUMIDITY_SUCCESS';
export const GET_AGGREGATED_HUMIDITY_ERROR = 'GET_AGGREGATED_HUMIDITY_ERROR';

export function getAggregatedHumidity(){
    return dispatch => {
        dispatch({type: GET_AGGREGATED_HUMIDITY});

        return axios.get(Api.getUrl('/humidity/aggregated'))
            .then(res => dispatch(getAggregatedHumiditySuccess(res.data)))
            .catch(error => dispatch(getAggregatedHumidityError(error.response.status, error.response.data)));
    };
}

export function getAggregatedHumiditySuccess(data){
    return {
        type: GET_AGGREGATED_HUMIDITY_SUCCESS,
        payload: {
            data
        }
    };
}

export function getAggregatedHumidityError(status, error){
    return {
        type: GET_AGGREGATED_HUMIDITY_ERROR,
        payload: {
            status,
            error
        }
    };
}
