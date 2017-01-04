import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeactivatedIcon from 'material-ui/svg-icons/av/not-interested';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { I18n, Translate } from 'react-i18nify';
import { editUser, deleteUser, fetchUsers } from '../../actions/user';
import { showConfirm } from '../../actions/confirm';

/**
 * A list item component used in the UserList component to display a user
 */
class UserListItem extends React.Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.activateDeactivate = this.activateDeactivate.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    /**
     * Clicking a list item redirects to the /users/:id page and displays the UserForm to edit the user.
     */
    edit() {
        this.props.dispatch(push(`/users/${this.props.user._id}`));
    }

    /**
     * Called when the user clicks the Activate/Deactivate action.
     */
    activateDeactivate() {
        const activateDeactivate = this.props.user.active ?
            I18n.t('component.userList.todeactivate') :
            I18n.t('component.userList.toactivate');

        this.props.dispatch(showConfirm({
            title: I18n.t('common.areYouSure'),
            description: I18n.t('component.userList.areYouSureActivate', {
                action: activateDeactivate,
                user: this.props.user.name
            }),
            okButton: <Translate value='common.yes'/>,
            cancelButton: <Translate value='common.no'/>,
            okCallback: () => {
                if (this.props.user.active) {
                    this.props.dispatch(editUser(Object.assign({}, this.props.user, {active: false}))).then(() => {
                        this.props.dispatch(fetchUsers());
                    });
                } else {
                    this.props.dispatch(editUser(Object.assign({}, this.props.user, {active: true}))).then(() => {
                        this.props.dispatch(fetchUsers());
                    });
                }
            }
        }));
    }

    /**
     * Called when the user clicks on the Delete action
     */
    deleteUser() {
        this.props.dispatch(showConfirm({
            title: I18n.t('common.areYouSure'),
            description: I18n.t('component.userList.areYouSureDelete', {user: this.props.user.name}),
            okButton: I18n.t('common.yes'),
            cancelButton: I18n.t('common.no'),
            okCallback: () => {
                this.props.dispatch(deleteUser(this.props.user._id));
            }
        }));
    }

    render() {
        const isActive = this.props.user.active;

        const menuItems = [
            <MenuItem key={1} primaryText="Edit" onTouchTap={this.edit}/>
        ];

        if (this.props.id !== this.props.user._id) {
            menuItems.push(<MenuItem key={2}
                                     primaryText={isActive ? I18n.t('component.userList.deactivate') : I18n.t('component.userList.activate')}
                                     onTouchTap={this.activateDeactivate}/>);
            menuItems.push(<MenuItem key={3} primaryText={I18n.t('component.userList.delete')}
                                     onTouchTap={this.deleteUser}/>);
        }

        const rightIcon = (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                {menuItems}
            </IconMenu>
        );

        const firstLetter = _.capitalize(_.head(this.props.user.name));

        return <ListItem primaryText={this.props.user.name}
                         secondaryText={this.props.user.email}
                         leftIcon={isActive ? null : <DeactivatedIcon />}
                         leftAvatar={isActive ? <Avatar>{firstLetter}</Avatar> : null}
                         onTouchTap={this.edit}
                         rightIconButton={rightIcon}/>;
    }
}

UserListItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(state => {
    return {
        id: state.auth.id
    };
})(UserListItem);
