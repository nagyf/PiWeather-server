import {ADD_SNACK, CLOSE_SNACK, addSnack, closeSnack} from './snack';

describe('actions.snack', function () {
    describe('addSnack', function () {
        it('must be defined', function () {
            expect(addSnack).toBeDefined();
        });

        it('must return an object with a type equal to ADD_SNACK', function () {
            expect(addSnack('').type).toEqual(ADD_SNACK);
        });

        it('must return an object with a payload containing the message', function () {
            const message = 'Hello, world!';
            expect(addSnack(message).payload).toEqual({
                message
            });
        });
    });

    describe('closeSnack', function () {
        it('must be defined', function () {
            expect(closeSnack).toBeDefined();
        });

        it('must return an object with a type equal to CLOSE_SNACK', function () {
            expect(closeSnack().type).toEqual(CLOSE_SNACK);
        });

        it('should not return a payload', function () {
            expect(closeSnack().payload).not.toBeDefined();
        });
    });
});
