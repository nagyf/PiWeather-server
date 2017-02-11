import deepFreeze from 'deep-freeze';
import reducer from './frame';
import {setTitle} from '../actions/frame';

describe('reducers.frame', function () {
    it('should return initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            title: 'PiWeather'
        });
    });

    it('should handle setTitle', function () {
        const state = {
            title: 'PiWeather'
        };
        deepFreeze(state);
        expect(reducer(state, setTitle('FooBar'))).toEqual({
            title: 'FooBar'
        });
    });
});
