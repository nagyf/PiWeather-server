import React, { PropTypes } from 'react';
import { FlatButton, Dialog } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { Row, Col } from 'react-flexbox-grid/lib';
import { connect } from 'react-redux';
import { I18n } from 'react-i18nify';
import { changePassword, CHANGE_PASSWORD_ERROR } from '../../actions/user';

class ChangePasswordDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            open: this.props.open,
            model: {
                password: '',
                passwordConfirm: ''
            }
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.state.open !== newProps.open) {
            this.setState({
                open: newProps.open
            });
        }
    }

    close() {
        this.setState({open: false});
    }

    save() {
        this.props.dispatch(changePassword(this.props.userId, this.state.model.password)).then(action => {
            if (action !== CHANGE_PASSWORD_ERROR) {
                this.setState({open: false});
            }
        });
    }

    cancel() {
        this.close();
    }

    /**
     * Handle change events from textboxes
     */
    handleChange(field, event) {
        const newValue = {};
        newValue[field] = event.target.value;
        this.setState({model: Object.assign({}, this.state.model, newValue)});
    }

    /**
     * Enables or disables the save button
     */
    enableButton(enable) {
        this.setState({canSubmit: enable});
    }

    render() {
        const actions = [
            <FlatButton
                label={I18n.t('common.cancel')}
                onTouchTap={this.cancel.bind(this)}
            />,
            <FlatButton
                label={I18n.t('common.save')}
                primary={true}
                disabled={!this.state.canSubmit}
                onTouchTap={this.save.bind(this)}
            />
        ];

        const inputStyle = {
            width: '100%'
        };

        return (
            <div>
                <Dialog
                    title={I18n.t('component.changePass.title')}
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    <Formsy.Form onValid={this.enableButton.bind(this, true)}
                                 onInvalid={this.enableButton.bind(this, false)}>
                        <Row>
                            <Col xs>
                                <FormsyText name='password' floatingLabelText={I18n.t('component.changePass.password')} type='password'
                                            value={this.state.model.password} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'password')}
                                            validations='isExisty'
                                            validationError={I18n.t('component.changePass.passwordError')}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs>
                                <FormsyText name='passwordConfirm' floatingLabelText={I18n.t('component.changePass.passwordConfirm')}
                                            type='password' value={this.state.model.passwordConfirm} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'passwordConfirm')}
                                            validations='isExisty,equalsField:password'
                                            validationError={I18n.t('component.changePass.passwordConfirmError')}
                                            required/>
                            </Col>
                        </Row>
                    </Formsy.Form>
                </Dialog>
            </div>
        );
    }
}

ChangePasswordDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    userId: PropTypes.string
};

export default connect()(ChangePasswordDialog);
