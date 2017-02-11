import deepFreeze from 'deep-freeze';
import {showConfirm, hideConfirm} from '../actions/confirm';
import reducer from './confirm';

describe('reducers.confirm', function () {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            show: false
        });
    });

    it('should handle SHOW_CONFIRM', function () {
        const state = {
            show: false
        };
        deepFreeze(state);
        expect(reducer(state, showConfirm()).show).toBeTruthy();
    });

    it('should handle HIDE_CONFIRM', function () {
        const state = {
            show: true
        };
        deepFreeze(state);
        expect(reducer(state, hideConfirm()).show).toBeFalsy();
    });
});
