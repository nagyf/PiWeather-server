import {SET_TITLE, setTitle} from './frame';

describe('actions.frame', function () {
    describe('setTitle', function () {
        it('must be defined', function () {
            expect(setTitle).toBeDefined();
        });

        it('must return an object with type equal to SET_TITLE', function () {
            expect(setTitle('title').type).toEqual(SET_TITLE);
        });

        it('must return a payload containing the title', function () {
            expect(setTitle('FooBar').payload).toEqual({
                title: 'FooBar'
            });
        });
    });
});
