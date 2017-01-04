import _ from 'lodash';
import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { I18n } from 'react-i18nify';

/**
 * The main menu of the application.
 */
class Menu extends React.Component {
    menuItemClicked() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick();
        }
    }

    render() {
        // Render the menu items based on the menu model
        const menuItems = this.props.menu.map((model, index) => {
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
    onClick: PropTypes.func
};

export default connect(state => {
    return {
        menu: state.menu
    };
})(Menu);
