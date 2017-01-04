import {SHOW_CONFIRM, HIDE_CONFIRM} from '../actions/confirm';

export default (state = {}, action) => {
    switch (action.type) {
        case SHOW_CONFIRM:
            return Object.assign({
                show: true
            }, action.payload);
        case HIDE_CONFIRM:
            return Object.assign({
                show: false
            }, action.payload);
        default:
            return {
                show: false
            };
    }
}
