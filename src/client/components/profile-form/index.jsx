import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, RaisedButton } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { Row, Col } from 'react-flexbox-grid/lib';
import { I18n } from 'react-i18nify';
import { editUser } from '../../actions/user';
import ChangePasswordDialog from '../change-password-dialog';

/**
 * A form component to edit users.
 */
class ProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            showPasswordDialog: false,
            user: Object.assign({}, this.props.user)
        };

        this.submit = this.submit.bind(this);
    }

    /**
     * Update the user data and display it
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: Object.assign({}, nextProps.user)
        });
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
        this.props.dispatch(editUser(this.state.user));
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
                    <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton.bind(this, true)}
                                 onInvalid={this.enableButton.bind(this, false)}>
                        <Row>
                            <Col xs>
                                <FormsyText name='name' floatingLabelText={I18n.t('component.profileForm.name')}
                                            type='text'
                                            value={this.state.user.name} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'name')}
                                            validations='isExisty,isSpecialWords'
                                            validationError={I18n.t('component.profileForm.nameError')}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs>
                                <FormsyText name='nick' floatingLabelText={I18n.t('component.profileForm.nick')}
                                            type='text'
                                            value={this.state.user.nick} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'nick')}
                                            validations='isExisty,isSpecialWords'
                                            validationError={I18n.t('component.profileForm.nickError')}
                                            required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs>
                                <FormsyText name='email' floatingLabelText={I18n.t('component.profileForm.email')}
                                            type='email'
                                            value={this.state.user.email} style={inputStyle}
                                            onChange={this.handleChange.bind(this, 'email')}
                                            validations="isEmail"
                                            validationError={I18n.t('component.profileForm.emailError')}
                                            disabled={_.isString(this.props.user._id)}
                                            required/>
                            </Col>
                        </Row>
                        <Row end='xs' className="action-buttons-wrapper">
                            <Col xs>
                                <RaisedButton secondary={true} disabled={!_.isString(this.props.user._id)}
                                              onTouchTap={() => this.setState({showPasswordDialog: true})}
                                              label={I18n.t('component.profileForm.changePassword')}/>
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

ProfileForm.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect()(ProfileForm);
