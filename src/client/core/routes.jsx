import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthenticatedApp from '../components/app';
import AnonymousApp from '../components/anonymous-app';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import User from '../pages/user';
import EditUser from '../pages/edit-user';
import Users from '../pages/users';
import Profile from '../pages/profile';
import Logout from '../pages/logout';

/**
 * Returns the application routes.
 * One for the unauthenticated users, and one for the authenticated users.
 */
export default [
    <Route path="/auth" component={AnonymousApp}>
        <Route path="login" component={Login}/>
        <Route path="*" component={Login}/>
    </Route>,
    <Route path="/" component={AuthenticatedApp}>
        <IndexRoute component={Dashboard}/>
        <Route path="logout" component={Logout}/>
        <Route path="me" component={Profile}/>
        <Route path="users/new" component={User}/>
        <Route path="users/:id" component={EditUser}/>
        <Route path="users" component={Users}/>
        <Route path="*" component={Dashboard}/>
    </Route>
];
