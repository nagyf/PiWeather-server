import {GET_AGGREGATED_HUMIDITY_SUCCESS, ADD_HUMIDITY, ADD_AGGREGATED_HUMIDITY, GET_HUMIDITY_SERIES_SUCCESS} from '../actions/humidity';

const initialState = {
    series: [],
    aggregated: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AGGREGATED_HUMIDITY_SUCCESS: {
            return Object.assign({}, state, {
                aggregated: action.payload.data
            });
        }
        case ADD_HUMIDITY: {
            return Object.assign({}, state, {
                series: state.series.concat([action.payload.humidity])
            });
        }
        case ADD_AGGREGATED_HUMIDITY: {
            return Object.assign({}, state, {
                aggregated: action.payload.aggregatedHumidity
            });
        }
        case GET_HUMIDITY_SERIES_SUCCESS: {
            return Object.assign({}, state, {
                series: action.payload.series
            });
        }
        default: {
            return state;
        }
    }
};
