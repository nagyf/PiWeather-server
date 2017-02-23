import {GET_VERSION_SUCCESS} from '../actions/version';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_VERSION_SUCCESS:
            return action.payload.version;
        default:
            return state;
    }
}
