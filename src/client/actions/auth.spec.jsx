import moxios from 'moxios';
import {LOGOUT, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN} from './auth';
import {logout, loginSuccess, loginError, login} from './auth';
import mockStore from '../test/mockStore';

describe('actions.auth', function () {
    describe('logout', function () {
        it('must be defined', function () {
            expect(logout).toBeDefined();
        });

        it('must return an object containing a type equal to LOGOUT', function () {
            expect(logout()).toEqual({
                type: LOGOUT
            });
        });
    });

    describe('loginSuccess', function () {
        it('must be defined', function () {
            expect(loginSuccess).toBeDefined();
        });

        it('must return an object', function () {
            expect(loginSuccess('123', 456)).toEqual({
                type: LOGIN_SUCCESS,
                payload: {
                    token: '123',
                    id: 456
                }
            });
        });
    });

    describe('loginError', function () {
        it('must be defined', function () {
            expect(loginError).toBeDefined();
        });

        it('must return an object', function () {
            expect(loginError('401', 'Unauthorized')).toEqual({
                type: LOGIN_ERROR,
                payload: {
                    status: '401',
                    error: 'Unauthorized'
                }
            });
        });
    });

    describe('login', function () {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install();
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall();
        });

        it('must be defined', function () {
            expect(login).toBeDefined();
        });

        it('must dispatch LOGIN_SUCCESS when the login was successful', function (done) {
            const expectedActions = [{
                type: LOGIN
            }, {
                type: LOGIN_SUCCESS,
                payload: {
                    id: 123,
                    token: '1112223334'
                }
            }];

            const store = mockStore();

            store.dispatch(login('asd@asd.hu', 'Password1234'));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {id: 123, token: '1112223334'}
                }).then(function () {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                })
            });
        });

        it('must dispatch LOGIN_ERROR when the login was unsuccessful', function (done) {
            const expectedActions = [{
                type: LOGIN
            }, {
                type: LOGIN_ERROR,
                payload: {
                    status: 401,
                    error: {error: 'Unauthorized'}
                }
            }];

            const store = mockStore();

            store.dispatch(login('asd@asd.hu', 'Password1234'));

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
