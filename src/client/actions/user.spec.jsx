import moxios from 'moxios';
import mockStore from '../test/mockStore';
import {CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, createUserSuccess, createUserError, createUser} from './user';
import {FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, FETCH_USERS, fetchUsersSuccess, fetchUsersError, fetchUsers} from './user';

const user = {
    id: 123,
    name: 'Foo Bar'
};

describe('actions.user', function () {
    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install();
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall();
    });

    describe('createUserSuccess', function () {
        it('must be defined', function () {
            expect(createUserSuccess).toBeDefined();
        });

        it('must return an object with a type equal to CREATE_USER_SUCCESS', function () {
            expect(createUserSuccess('').type).toEqual(CREATE_USER_SUCCESS);
        });

        it('must return an object with a payload containing the user', function () {
            expect(createUserSuccess(user).payload).toEqual({
                user
            });
        });
    });

    describe('createUserError', function () {
        it('must be defined', function () {
            expect(createUserError).toBeDefined();
        });

        it('must return an object with a type equal to CREATE_USER_ERROR', function () {
            expect(createUserError(401, 'Unauthorized').type).toEqual(CREATE_USER_ERROR);
        });

        it('must return an object with a payload containing the status and the error', function () {
            const status = 401;
            const error = 'Unauthorized';
            expect(createUserError(status, error).payload).toEqual({
                status,
                error
            });
        });
    });

    describe('createUser', function () {
        it('must be defined', function () {
            expect(createUser).toBeDefined();
        });

        it('must dispatch CREATE_USER_SUCCESS when the create was successful', function (done) {
            const expectedActions = [{
                type: CREATE_USER
            }, {
                type: CREATE_USER_SUCCESS,
                payload: {
                    user
                }
            }];

            const store = mockStore();

            store.dispatch(createUser(user));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: user
                }).then(function () {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
            });
        });

        it('must dispatch CREATE_USER_ERROR when the save was unsuccessful', function (done) {
            const expectedActions = [{
                type: CREATE_USER
            }, {
                type: CREATE_USER_ERROR,
                payload: {
                    status: 401,
                    error: {error: 'Unauthorized'}
                }
            }];

            const store = mockStore();

            store.dispatch(createUser(user));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 401,
                    response: {
                        error: 'Unauthorized'
                    }
                }).then(function () {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
            });
        });
    });

    describe('fetchUsersSuccess', function () {
        it('must be defined', function () {
            expect(fetchUsersSuccess).toBeDefined();
        });

        it('must return an object with a type equal to FETCH_USERS_SUCCESS', function () {
            expect(fetchUsersSuccess().type).toEqual(FETCH_USERS_SUCCESS);
        });

        it('must return an object with a payload containing the users', function () {
            expect(fetchUsersSuccess([user]).payload).toEqual({
                users: [user]
            });
        });
    });

    describe('fetchUsersError', function () {
        it('must be defined', function () {
            expect(fetchUsersError).toBeDefined();
        });

        it('must return an object with a type equal to FETCH_USERS_ERROR', function () {
            expect(fetchUsersError(401, 'Unauthorized').type).toEqual(FETCH_USERS_ERROR);
        });

        it('must return an object with a payload containing the status and the error', function () {
            const status = 401;
            const error = 'Unauthorized';
            expect(fetchUsersError(status, error).payload).toEqual({
                status,
                error
            });
        });
    });

    describe('fetchUsers', function () {
        it('must be defined', function () {
            expect(fetchUsers).toBeDefined();
        });

        it('must dispatch FETCH_USERS_SUCCESS when the create was successful', function (done) {
            const expectedActions = [{
                type: FETCH_USERS
            }, {
                type: FETCH_USERS_SUCCESS,
                payload: {
                    users: [user]
                }
            }];

            const store = mockStore();

            store.dispatch(fetchUsers());

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: [user]
                }).then(function () {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
            });
        });

        it('must dispatch CREATE_USER_ERROR when the save was unsuccessful', function (done) {
            const expectedActions = [{
                type: FETCH_USERS
            }, {
                type: FETCH_USERS_ERROR,
                payload: {
                    status: 401,
                    error: {error: 'Unauthorized'}
                }
            }];

            const store = mockStore();

            store.dispatch(fetchUsers());

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 401,
                    response: {
                        error: 'Unauthorized'
                    }
                }).then(function () {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
            });
        });
    });
});
