import {GET_AGGREGATED_PRESSURE_SUCCESS} from '../actions/pressure';

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
        default: {
            return state;
        }
    }
};
