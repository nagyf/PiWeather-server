import {CREATE_USER, EDIT_USER, ACTIVATE_USER, DEACTIVATE_USER, DELETE_USER} from './user';
import {createUserAction, editUserAction, activateUserAction, deactivateUserAction, deleteUserAction} from './user';

describe('user actions', function () {
    it('createUserAction()', function () {
        const user = {id: 10};
        expect(createUserAction()).toBeTruthy();
        expect(createUserAction().type).toBe(CREATE_USER);
        expect(createUserAction(user).payload.user.id).toBe(10);
    });

    it('editUserAction()', function () {
        const user = {id: 10};
        expect(editUserAction()).toBeTruthy();
        expect(editUserAction().type).toBe(EDIT_USER);
        expect(editUserAction(user).payload.user.id).toBe(10);
    });

    it('activateUserAction()', function () {
        const user = {id: 10};
        expect(activateUserAction()).toBeTruthy();
        expect(activateUserAction().type).toBe(ACTIVATE_USER);
        expect(activateUserAction(user).payload.user.id).toBe(10);
    });

    it('deactivateUserAction()', function () {
        const user = {id: 10};
        expect(deactivateUserAction()).toBeTruthy();
        expect(deactivateUserAction().type).toBe(DEACTIVATE_USER);
        expect(deactivateUserAction(user).payload.user.id).toBe(10);
    });

    it('deleteUserAction()', function () {
        const user = {id: 10};
        expect(deleteUserAction()).toBeTruthy();
        expect(deleteUserAction().type).toBe(DELETE_USER);
        expect(deleteUserAction(user).payload.user.id).toBe(10);
    });
});

