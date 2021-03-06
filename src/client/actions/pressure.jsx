import axios from 'axios';
import Api from './api';

export const GET_AGGREGATED_PRESSURE = 'GET_AGGREGATED_PRESSURE';
export const GET_AGGREGATED_PRESSURE_SUCCESS = 'GET_AGGREGATED_PRESSURE_SUCCESS';
export const GET_AGGREGATED_PRESSURE_ERROR = 'GET_AGGREGATED_PRESSURE_ERROR';

export const GET_PRESSURE_SERIES = 'GET_PRESSURE_SERIES';
export const GET_PRESSURE_SERIES_SUCCESS = 'GET_PRESSURE_SERIES_SUCCESS';
export const GET_PRESSURE_SERIES_ERROR = 'GET_PRESSURE_SERIES_ERROR';

export const ADD_PRESSURE = 'ADD_PRESSURE';
export const ADD_AGGREGATED_PRESSURE = 'ADD_AGGREGATED_PRESSURE';

export function getAggregatedPressure(){
    return dispatch => {
        dispatch({type: GET_AGGREGATED_PRESSURE});

        return axios.get(Api.getUrl('/pressure/aggregated'))
            .then(res => dispatch(getAggregatedPressureSuccess(res.data)))
            .catch(error => dispatch(getAggregatedPressureError(error.response.status, error.response.data)));
    };
}

export function getAggregatedPressureSuccess(data){
    return {
        type: GET_AGGREGATED_PRESSURE_SUCCESS,
        payload: {
            data
        }
    };
}

export function getAggregatedPressureError(status, error){
    return {
        type: GET_AGGREGATED_PRESSURE_ERROR,
        payload: {
            status,
            error
        }
    };
}

export function getPressureSeries(){
    return dispatch => {
        dispatch({type: GET_PRESSURE_SERIES});

        return axios.get(Api.getUrl('/pressure'))
            .then(res => dispatch(getPressureSeriesSuccess(res.data)))
            .catch(error => dispatch(getPressureSeriesError(error.response.status, error.response.data)));
    };
}

export function getPressureSeriesSuccess(series) {
    return {
        type: GET_PRESSURE_SERIES_SUCCESS,
        payload: {
            series
        }
    };
}

export function getPressureSeriesError(status, error){
    return {
        type: GET_PRESSURE_SERIES_ERROR,
        payload: {
            status,
            error
        }
    };
}

export function addPressure(pressure) {
    return {
        type: ADD_PRESSURE,
        payload: {
            pressure
        }
    };
}

export function addAggregatedPressure(aggregatedPressure) {
    return {
        type: ADD_AGGREGATED_PRESSURE,
        payload: {
            aggregatedPressure
        }
    };
}
