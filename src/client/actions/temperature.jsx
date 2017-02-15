import axios from 'axios';
import Api from './api';

export const GET_AGGREGATED_TEMP = 'GET_AGGREGATED_TEMP';
export const GET_AGGREGATED_TEMP_SUCCESS = 'GET_AGGREGATED_TEMP_SUCCESS';
export const GET_AGGREGATED_TEMP_ERROR = 'GET_AGGREGATED_TEMP_ERROR';

export const GET_TEMPERATURE_SERIES = 'GET_TEMPERATURE_SERIES';
export const GET_TEMPERATURE_SERIES_SUCCESS = 'GET_TEMPERATURE_SERIES_SUCCESS';
export const GET_TEMPERATURE_SERIES_ERROR = 'GET_TEMPERATURE_SERIES_ERROR';

export const ADD_TEMPERATURE = 'ADD_TEMPERATURE';
export const ADD_AGGREGATED_TEMPERATURE = 'ADD_AGGREGATED_TEMPERATURE';

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

export function getTemperatureSeries(){
    return dispatch => {
        dispatch({type: GET_TEMPERATURE_SERIES});

        return axios.get(Api.getUrl('/temperature'))
            .then(res => dispatch(getTemperatureSeriesSuccess(res.data)))
            .catch(error => dispatch(getTemperatureSeriesError(error.response.status, error.response.data)));
    };
}

export function getTemperatureSeriesSuccess(series) {
    return {
        type: GET_TEMPERATURE_SERIES_SUCCESS,
        payload: {
            series
        }
    };
}

export function getTemperatureSeriesError(status, error){
    return {
        type: GET_TEMPERATURE_SERIES_ERROR,
        payload: {
            status, error
        }
    };
}

export function addTemperature(temperature) {
    return {
        type: ADD_TEMPERATURE,
        payload: {
            temperature
        }
    };
}

export function addAggregatedTemperature(aggregatedTemperature) {
    return {
        type: ADD_AGGREGATED_TEMPERATURE,
        payload: {
            aggregatedTemperature
        }
    };
}
