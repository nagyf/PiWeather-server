import {GET_AGGREGATED_PRESSURE_SUCCESS, ADD_PRESSURE, ADD_AGGREGATED_PRESSURE, GET_PRESSURE_SERIES_SUCCESS} from '../actions/pressure';

const initialState = {
    series: [],
    aggregated: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AGGREGATED_PRESSURE_SUCCESS: {
            return Object.assign({}, state, {
                aggregated: action.payload.data
            });
        }
        case ADD_PRESSURE: {
            return Object.assign({}, state, {
                series: state.series.concat([action.payload.pressure])
            });
        }
        case ADD_AGGREGATED_PRESSURE: {
            return Object.assign({}, state, {
                aggregated: action.payload.aggregatedPressure
            });
        }
        case GET_PRESSURE_SERIES_SUCCESS: {
            return Object.assign({}, state, {
                series: action.payload.series
            });
        }
        default: {
            return state;
        }
    }
};
