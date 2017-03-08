import _ from 'lodash';
import React, { PropTypes } from 'react';
import UserForm from '../../components/userform';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/frame';
import { I18n } from 'react-i18nify';
import { fetchUser } from '../../actions/user';
import provideCurrentUser from '../../components/userProvider';

/**
 * This page displays a UserForm to edit a user
 */
class EditUser extends React.Component {
    /**
     * Tries to fetch the user with the given id
     */
    componentWillMount() {
        if (!_.isObject(this.props.editedUser) || _.isEmpty(this.props.editedUser)) {
            this.props.dispatch(fetchUser(this.props.editedUserId));
        }

        this.props.dispatch(setTitle(I18n.t('page.editUser.title')));
    }

    render() {
        return (
            <UserForm user={this.props.editedUser} currentUserId={this.props.id}/>
        );
    }
}

EditUser.propTypes = {
    id: PropTypes.string.isRequired,
    editedUserId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    editedUser: PropTypes.object.isRequired
};

export default connect((state, ownProps) => {
    const id = ownProps.params.id;
    const editedUser = _.chain(state.users).filter(u => u._id === id).head().value() || {};

    return {
        editedUser: editedUser,
        editedUserId: id
    };
})(provideCurrentUser(EditUser));
