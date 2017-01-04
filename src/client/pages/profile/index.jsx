import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18nify';
import { Paper, Avatar } from 'material-ui';
import { setTitle } from '../../actions/frame';
import { fetchUser } from '../../actions/user';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ProfileForm from '../../components/profile-form';

/**
 * Profile page where users can change their settings, upload avatar pictures, change password and stuff like that.
 */
class Profile extends Component {
    componentWillMount() {
        this.props.dispatch(setTitle(I18n.t('page.profile.title')));
        if (!this.props.user._id) {
            this.props.dispatch(fetchUser(this.props.id));
        }
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

export default connect((state) => {
    const id = state.auth.id;
    const user = _.chain(state.users).filter(u => u._id === id).head().value() || {};

    return {
        id: id,
        user: user
    };
})(Profile);
