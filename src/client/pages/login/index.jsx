import _ from 'lodash';
import React from 'react';
import { Paper, RaisedButton, Divider } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { login, LOGIN_ERROR } from '../../actions/auth';
import { connect } from 'react-redux';
import { red500 } from 'material-ui/styles/colors';
import { I18n, Translate } from 'react-i18nify';
import './login.less';

/**
 * The login page is displayed only for unauthenticated users.
 * Displays a login form.
 */
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            error: '',
            user: {
                email: '',
                password: ''
            }
        };
    }

    handleChange(field, event) {
        const newValue = {};
        newValue[field] = event.target.value;
        this.setState({user: Object.assign({}, this.state.user, newValue)});
    }

    submit() {
        this.props.dispatch(login(this.state.user.email, this.state.user.password)).then(res => {
            if (res.type === LOGIN_ERROR) {
                this.setState({error: I18n.t('page.login.invalidCredentials')});
            }
        });
    }

    enableButton(enable) {
        this.setState({canSubmit: enable});
    }

    render() {
        const inputStyle = {
            width: '100%'
        };

        const errorStyle = {
            color: red500
        };

        return (
            <Row>
                <Col xs sm={6} md={4} smOffset={3} mdOffset={4}>
                    <Paper zDepth={2} className="login-wrapper">
                        <h2><Translate value='page.login.title'/></h2>
                        <Divider/>
                        {!_.isEmpty(this.state.error) ? <p style={errorStyle}>{this.state.error}</p> : <span />}
                        <Formsy.Form onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this, true)}
                                     onInvalid={this.enableButton.bind(this, false)}>
                            <Row>
                                <Col xs>
                                    <FormsyText name='email' floatingLabelText={I18n.t('page.login.email')}
                                                type='email'
                                                value={this.state.user.email} style={inputStyle}
                                                onChange={this.handleChange.bind(this, 'email')}
                                                validations="isEmail"
                                                validationError={I18n.t('page.login.emailError')}
                                                required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs>
                                    <FormsyText name='password'
                                                floatingLabelText={I18n.t('page.login.password')}
                                                type='password'
                                                value={this.state.user.password} style={inputStyle}
                                                onChange={this.handleChange.bind(this, 'password')}
                                                validations="isExisty"
                                                validationError={I18n.t('page.login.passwordError')}
                                                required/>
                                </Col>
                            </Row>
                            <Row end='xs'>
                                <Col xs>
                                    <RaisedButton primary={true} type='submit' disabled={!this.state.canSubmit}
                                                  label={I18n.t('page.login.title')}/>
                                </Col>
                            </Row>
                        </Formsy.Form>
                    </Paper>
                </Col>
            </Row>
        );
    }
}

export default connect()(Login);
