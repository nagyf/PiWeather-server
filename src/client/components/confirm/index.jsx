import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {hideConfirm} from '../../actions/confirm';
import {I18n} from 'react-i18nify';

/**
 * This component can display a confirm dialog to the user.
 */
class ConfirmDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleClose() {
        this.props.dispatch(hideConfirm());
    }

    handleOk() {
        this.handleClose();

        if (_.isFunction(this.props.confirm.okCallback)) {
            this.props.confirm.okCallback();
        }
    }

    handleCancel() {
        this.handleClose();

        if (_.isFunction(this.props.confirm.cancelCallback)) {
            this.props.confirm.cancelCallback();
        }
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.confirm.cancelButton || I18n.t('common.cancel')}
                primary={true}
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label={this.props.confirm.okButton || I18n.t('common.ok')}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOk}
            />
        ];

        return (
            <div>
                <Dialog
                    title={this.props.confirm.title || ''}
                    actions={actions}
                    modal={true}
                    open={this.props.confirm.show || false}
                    onRequestClose={this.handleCancel}>
                    {this.props.confirm.description || ''}
                </Dialog>
            </div>
        );
    }
}

export default connect(state => {
    return {
        confirm: state.confirm
    };
})(ConfirmDialog);
