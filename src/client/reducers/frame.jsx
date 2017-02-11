import {SET_TITLE} from '../actions/frame';

const initialState = {
    title: 'PiWeather'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({}, state, {
                title: action.payload.title
            });
        default:
            return state;
    }
}
