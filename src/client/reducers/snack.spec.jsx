import deepFreeze from 'deep-freeze';
import {addSnack, closeSnack} from '../actions/snack';
import reducer from './snack';

describe('reducers.snack', function () {
   it('should return the initial state', function () {
        expect(reducer(undefined, {}).open).toEqual(false);
   });

   it('should handle addSnack', function () {
       const state = {
           open: false
       };

       deepFreeze(state);

       expect(reducer(state, addSnack('Foo Bar'))).toEqual({
           open: true,
           message: 'Foo Bar'
       });
   });

    it('should handle closeSnack', function () {
        const state = {
            open: true
        };

        deepFreeze(state);

        expect(reducer(state, closeSnack())).toEqual({
            open: false,
            message: ''
        });
    });
});
