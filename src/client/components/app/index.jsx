import React, {PropTypes} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Header from '../header';
import PersistentStorage from '../../util/storage';
import ConfirmDialog from '../confirm';
import {logout} from '../../actions/auth';
import ReduxSnackbar from '../redux-snackbar';

/**
 * This part of the application is only accessable to authenticated users.
 */
class AuthenticatedApp extends React.Component {
    logout() {
        PersistentStorage.setJwtToken(null);
        PersistentStorage.setCurrentUserId(null);
        this.props.dispatch(logout());
        this.props.dispatch(push('/auth/login'));
    }

    /**
     * Check if there is an authenticated user. If it's not the case, redirect to the login page.
     */
    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.logout();
        }
    }

    /**
     * If the user becomes unauthenticated then we have to redirect to the login page.
     */
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated) {
            this.logout();
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div id='app'>
                    <Header currentPath={this.props.currentPath}/>
                    <ConfirmDialog />
                    <ReduxSnackbar />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

AuthenticatedApp.propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool.isRequired
};

export default connect((state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        currentPath: ownProps.router.location.pathname
    };
})(AuthenticatedApp);
