import {GET_AGGREGATED_HUMIDITY_SUCCESS} from '../actions/humidity';

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
        default: {
            return state;
        }
    }
};
