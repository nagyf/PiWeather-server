import {GET_AGGREGATED_TEMP_SUCCESS, ADD_TEMPERATURE, ADD_AGGREGATED_TEMPERATURE} from '../actions/temperature';

const initialState = {
    series: [],
    aggregated: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AGGREGATED_TEMP_SUCCESS: {
            return Object.assign({}, state, {
                aggregated: action.payload.data
            });
        }
        case ADD_TEMPERATURE: {
            return Object.assign({}, state, {
                series: state.series.concat([action.payload.temperature])
            });
        }
        case ADD_AGGREGATED_TEMPERATURE: {
            return Object.assign({}, state, {
                aggregated: action.payload.aggregatedTemperature
            });
        }
        default: {
            return state;
        }
    }
};
