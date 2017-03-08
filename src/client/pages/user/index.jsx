import React from 'react';
import { connect } from 'react-redux';
import UserForm from '../../components/userform';
import {setTitle} from '../../actions/frame';
import { I18n } from 'react-i18nify';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {}
        };
    }

    componentWillMount(){
        this.props.dispatch(setTitle(I18n.t('page.newUser.title')));
    }

    render() {
        return (
            <UserForm user={this.state.user} currentUserId={''}/>
        );
    }
}

export default connect()(User);
