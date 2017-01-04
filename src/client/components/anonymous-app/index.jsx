import React, {PropTypes} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PersistentStorage from '../../util/storage';
import ReduxSnackbar from '../redux-snackbar';

/**
 * This part of the application is displayed only to unauthenticated users.
 */
class AnonymousApp extends React.Component {
    /**
     * Checks if there is a logged in user. If there's one, redirect to the dashboard.
     */
    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    /**
     * If the user successfully authenticates then we have to set the JWT token in the localstorage and redirect to the
     * dashboard.
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            PersistentStorage.setCurrentUserId(nextProps.id);
            PersistentStorage.setJwtToken(nextProps.token);
            this.props.dispatch(push('/'));
        }
    }

    /**
     * Render the application
     */
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div id='app'>
                    <ReduxSnackbar />
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

AnonymousApp.propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool.isRequired
};

export default connect(state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        id: state.auth.id
    };
})(AnonymousApp);
