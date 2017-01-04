import {SHOW_CONFIRM, HIDE_CONFIRM, showConfirm, hideConfirm} from './confirm';

describe('confirm actions', function () {
    describe('showConfirm()', function () {
        it('must return an object', function () {
            expect(showConfirm()).toBeTruthy();
        });

        it(`must contain the type ${SHOW_CONFIRM}`, function () {
            expect(showConfirm().type).toBe(SHOW_CONFIRM);
        });

        it(`must contain the options object in the payload`, function () {
            const options = {
                title: 'confirm',
                description: 'sure',
                okButton: 'Yes',
                cancelButton: 'No'
            };
            expect(showConfirm(options).payload.title).toBe(options.title);
            expect(showConfirm(options).payload.description).toBe(options.description);
            expect(showConfirm(options).payload.okButton).toBe(options.okButton);
            expect(showConfirm(options).payload.cancelButton).toBe(options.cancelButton);
        });
    });

    describe('hideConfirm()', function () {
        it('must return an object', function () {
            expect(hideConfirm()).toBeTruthy();
        });

        it(`must contain the type ${HIDE_CONFIRM}`, function () {
            expect(hideConfirm().type).toBe(HIDE_CONFIRM);
        });
    });
});
