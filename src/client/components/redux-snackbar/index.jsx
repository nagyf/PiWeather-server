import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18nify';
import { Snackbar } from 'material-ui';
import { closeSnack } from '../../actions/snack';

/**
 * Redux store aware snackbar, that can be activated by dispatching actions on the redux store.
 */
class ReduxSnackbar extends Component {
    handleRequestClose() {
        this.props.dispatch(closeSnack());
    }

    render() {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                action={I18n.t('common.dismiss')}
                autoHideDuration={this.props.delay}
                onRequestClose={this.handleRequestClose.bind(this)}
            />
        );
    }
}

ReduxSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired
};

export default connect(state => {
    return {
        open: state.snack.open,
        message: state.snack.message,
        delay: state.snack.delay
    };
})(ReduxSnackbar);
