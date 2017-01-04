import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import UserList from '../../components/userlist';
import {fetchUsers} from '../../actions/user';
import {setTitle} from '../../actions/frame';
import { I18n } from 'react-i18nify';

/**
 * This page displays the UserList component and lists the available users.
 */
class Users extends React.Component {
    /**
     * Fetch the users
     */
    componentWillMount() {
        this.props.dispatch(fetchUsers());
        this.props.dispatch(setTitle(I18n.t('page.users.title')));
    }

    render() {
        return (
            <UserList users={this.props.users}/>
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default connect(state => {
    return {
        users: state.users
    };
})(Users);
