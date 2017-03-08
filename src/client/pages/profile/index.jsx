import React, { Component } from 'react';
import { I18n } from 'react-i18nify';
import { Paper, Avatar } from 'material-ui';
import { setTitle } from '../../actions/frame';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {connect} from 'react-redux';
import provideCurrentUser from '../../components/userProvider';
import ProfileForm from '../../components/profile-form';

/**
 * Profile page where users can change their settings, upload avatar pictures, change password and stuff like that.
 */
class Profile extends Component {
    componentWillMount() {
        this.props.dispatch(setTitle(I18n.t('page.profile.title')));
    }

    render() {
        return (
            <Paper zDepth={2} className="paper-container">
                <Grid>
                    <Row>
                        <Col xs={3} md={1}><Avatar size={60}>N</Avatar></Col>
                        <Col xs><h2>{this.props.user.name}</h2></Col>
                    </Row>
                    <Row>
                        <Col xs>
                            <ProfileForm user={this.props.user}/>
                        </Col>
                    </Row>
                </Grid>
            </Paper>
        );
    }
}

export default connect()(provideCurrentUser(Profile));
