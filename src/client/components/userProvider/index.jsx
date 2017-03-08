import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user';

/**
 * Exports a function that wraps an existing component and provides it with the current user details, such as the user object and the id.
 */
export default function provideCurrentUser(ChildComponent) {
    class UserProviderComponent extends React.Component {
        constructor(props, context) {
            super(props, context);
        }

        componentWillMount() {
            if (!this.props.user._id) {
                this.props.dispatch(fetchUser(this.props.id));
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    UserProviderComponent.propTypes = {
        user: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired
    };

    return connect(state => {
        const id = state.auth.id;
        const user = _.chain(state.users).filter(u => u._id === id).head().value() || {};

        return {
            id: id,
            user: user
        };
    })(UserProviderComponent);
}
