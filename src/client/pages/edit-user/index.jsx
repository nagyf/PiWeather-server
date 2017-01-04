import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import UserForm from '../../components/userform';
import {fetchUser} from '../../actions/user';
import {setTitle} from '../../actions/frame';
import { I18n } from 'react-i18nify';

/**
 * This page displays a UserForm to edit a user
 */
class EditUser extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: this.props.user
        };
    }

    /**
     * Tries to fetch the user with the given id
     */
    componentWillMount() {
        if (!_.isObject(this.props.user) || _.isEmpty(this.props.user)) {
            this.props.dispatch(fetchUser(this.props.id));
        }

        this.props.dispatch(setTitle(I18n.t('page.editUser.title')));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    render() {
        return (
            <UserForm user={this.state.user}/>
        );
    }
}

EditUser.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};

export default connect((state, ownProps) => {
    const id = ownProps.params.id;
    const user = _.chain(state.users).filter(u => u._id === id).head().value() || {};

    return {
        id: id,
        user: user
    };
})(EditUser);
