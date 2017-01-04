import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Paper, List, FloatingActionButton} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import AddIcon from 'material-ui/svg-icons/content/add';
import UserListItem from './listitem';

/**
 * User listing component.
 * Displays a list item for every user, and display some action buttons for every item.
 */
class UserList extends React.Component {
    /**
     * Render the user list items based on the list of users
     * @param users the list of users
     */
    static renderUsers(users) {
        if (users.length > 0) {
            return _.sortBy(users, u => u.name).map(user => {
                return <UserListItem key={user._id} user={user}/>;
            });
        } else {
            return <p>There are no users</p>;
        }
    }

    /**
     * Called when the new user button is clicked.
     * Redirects to the /users/new URL
     */
    newUser() {
        this.props.dispatch(push('users/new'));
    }

    render() {
        return (
            <Paper zDepth={1} className="paper-container">
                <Row>
                    <Col xs>
                        <List>
                            {UserList.renderUsers(this.props.users)}
                        </List>
                    </Col>
                </Row>
                <Row end='xs'>
                    <Col xs>
                        <FloatingActionButton className='list-add-button' onTouchTap={this.newUser.bind(this)}>
                            <AddIcon />
                        </FloatingActionButton>
                    </Col>
                </Row>
            </Paper>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
};

export default connect()(UserList);
