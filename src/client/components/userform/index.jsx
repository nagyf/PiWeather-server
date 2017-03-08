import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Paper, RaisedButton, Subheader } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { Row, Col } from 'react-flexbox-grid/lib';
import {I18n} from 'react-i18nify';

import { createUser, editUser } from '../../actions/user';
import ChangePasswordDialog from '../change-password-dialog';
import roles from '../../../common/roles';
import './user-form.less';

const userDefaults = {
    name: '',
    email: '',
    active: true
};

/**
 * A form component to edit users.
 */
class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            showPasswordDialog: false,
            user: Object.assign({}, userDefaults, this.props.user),
            currentUserId : this.props.currentUserId || ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.submit = this.submit.bind(this);
    }

    /**
     * Update the user data and display it
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: Object.assign({}, userDefaults, nextProps.user),
            currentUserId : nextProps.currentUserId || ''
        });
    }

    /**
     * Handle the toggle events from checkboxes and such components.
     */
    handleToggle(field) {
        if(field === 'active') {
            const newValue = {
                active: !this.state.user.active
            };

            this.setState({
                user: Object.assign({}, this.state.user, newValue)
            });
        } else if(field === 'role'){
            const newValue = {
                role: this.state.user.role === roles.ADMIN ? roles.USER : roles.ADMIN
            };

            this.setState({
                user: Object.assign({}, this.state.user, newValue)
            });
        }
    }

    /**
     * Handle change events from textboxes
     */
    handleChange(field, event) {
        const newValue = {};
        newValue[field] = event.target.value;
        this.setState({user: Object.assign({}, this.state.user, newValue)});
    }

    /**
     * Submit the form
     */
    submit() {
        if (this.state.user._id) {
            this.props.dispatch(editUser(this.state.user)).then(() => {
                this.props.dispatch(push('/users'));
            });
        } else {
            this.props.dispatch(createUser(this.state.user)).then(() => {
                this.props.dispatch(push('/users'));
            });
        }
    }

    /**
     * Enables or disables the save button
     */
    enableButton(enable) {
        this.setState({canSubmit: enable});
    }

    render() {
        const inputStyle = {
            width: '100%'
        };

        return (
            <Paper zDepth={1} className="paper-container">
                <div>
                    <ChangePasswordDialog userId={this.state.user._id} open={this.state.showPasswordDialog}/>
                    <Subheader>{this.state.user._id ? 'Edit user' : 'Create new user'}</Subheader>
                    <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton.bind(this, true)}
                                 onInvalid={this.enableButton.bind(this, false)}>
                        <Row>
                            <Col xs>
                                <FormsyText name='name' floatingLabelText={I18n.t('component.userForm.name')} type='text'
                                            value={this.state.user.name} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'name')}
                                            validations='isExisty,isSpecialWords'
                                            validationError={I18n.t('component.userForm.nameError')}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs>
                                <FormsyText name='nick' floatingLabelText={I18n.t('component.userForm.nick')} type='text'
                                            value={this.state.user.nick} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'nick')}
                                            validations='isExisty,isSpecialWords'
                                            validationError={I18n.t('component.userForm.nickError')}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs>
                                <FormsyText name='email' floatingLabelText={I18n.t('component.userForm.email')} type='email'
                                            value={this.state.user.email} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'email')}
                                            validations="isEmail" validationError={I18n.t('component.userForm.emailError')}
                                            disabled={_.isString(this.props.user._id)}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <FormsyToggle name='active' label={I18n.t('component.userForm.active')} value={this.state.user.active}
                                              disabled={this.props.user._id === this.state.currentUserId}
                                              onChange={this.handleToggle.bind(this, 'active')}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                                <FormsyToggle name='role' label={I18n.t('component.userForm.admin')} value={this.state.user.role === roles.ADMIN}
                                              disabled={this.props.user._id === this.state.currentUserId}
                                              onChange={this.handleToggle.bind(this, 'role')}/>
                            </Col>
                        </Row>
                        <Row end='xs' className="action-buttons-wrapper">
                            <Col xs>
                                <RaisedButton secondary={true} disabled={!_.isString(this.props.user._id)}
                                              onTouchTap={() => this.setState({showPasswordDialog: true})}
                                              label={I18n.t('component.userForm.changePassword')}/>
                                <RaisedButton primary={true} type='submit' disabled={!this.state.canSubmit}
                                              label={I18n.t('common.save')}/>
                            </Col>
                        </Row>
                    </Formsy.Form>
                </div>
            </Paper>
        );
    }
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired
};

export default connect()(UserForm);
