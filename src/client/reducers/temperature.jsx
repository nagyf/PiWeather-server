import {GET_AGGREGATED_TEMP_SUCCESS} from '../actions/temperature';

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
        default: {
            return state;
        }
    }
};
