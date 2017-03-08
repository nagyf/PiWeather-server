import _ from 'lodash';
import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { I18n } from 'react-i18nify';
import { fetchUser } from '../../actions/user';
import roles from '../../../common/roles';
import provideCurrentUser from '../userProvider';

/**
 * The main menu of the application.
 */
class Menu extends React.Component {
    menuItemClicked() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick();
        }
    }

    componentWillMount() {
        if (!this.props.user._id) {
            this.props.dispatch(fetchUser(this.props.id));
        }
    }

    render() {
        // Render the menu items based on the menu model
        const menuModel = _.filter(this.props.menu, item => {
            return _.isUndefined(item.role) || _.isNull(item.role) || this.props.user.role === roles.ADMIN || this.props.user.role === item.role;
        });

        const menuItems = menuModel.map((model, index) => {
            const icon = <FontIcon className='material-icons'>{model.icon}</FontIcon>;
            const link = <Link to={model.url}/>;

            return <MenuItem key={index}
                             onTouchTap={this.menuItemClicked.bind(this)}
                             primaryText={I18n.t(model.name)}
                             containerElement={link}
                             leftIcon={icon}/>
        });

        return (
            <div className='app-menu'>
                {menuItems}
            </div>
        );
    }
}

Menu.propTypes = {
    menu: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

const MenuWithCurrentUser = provideCurrentUser(Menu);

export default connect(state => {
    return {
        menu: state.menu
    };
})(MenuWithCurrentUser);
