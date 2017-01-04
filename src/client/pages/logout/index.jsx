import React from 'react';
import {logout} from '../../actions/auth';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PersistentStorage from '../../util/storage';

/**
 * The logout page of the application.
 * Displays nothing, but upon loading it resets the JWT token in the localstorage, calls the logout action
 * and redirects to the login page.
 */
class Logout extends React.Component {
    componentWillMount() {
        PersistentStorage.setJwtToken(null);
        PersistentStorage.setCurrentUserId(null);
        this.props.dispatch(logout());
        this.props.dispatch(push('/'));
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect()(Logout);
