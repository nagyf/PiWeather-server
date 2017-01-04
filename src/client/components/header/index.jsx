import _ from 'lodash';
import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Menu from '../menu';
import LoadingBar from 'react-redux-loading-bar';
import { Translate } from 'react-i18nify';
import './loading-bar.less';

/**
 * The header of the application, displays the application bar and a navigation component.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.closeNavigation = this.closeNavigation.bind(this)
    }

    closeNavigation() {
        this.setState({
            open: false
        });
    }

    renderLeftElement() {
        const topLevelPaths = this.props.menu.map(m => m.url);

        if (_.find(topLevelPaths, p => p === this.props.currentPath) !== undefined) {
            // If the current path is a top level page, display a menu button
            return <IconButton
                onTouchTap={() => this.setState({open: true})}>
                <MenuIcon />
            </IconButton>;
        } else {
            // Otherwise display a back arrow icon
            return <IconButton
                onTouchTap={() => this.props.dispatch(goBack())}>
                <ArrowBackIcon />
            </IconButton>;
        }
    }

    render() {
        return (
            <div id='header'>
                <LoadingBar className='loading-bar'/>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <AppBar title={<Translate value='nav.title'/>} iconElementLeft={<IconButton
                        onTouchTap={() => this.closeNavigation()}><CloseIcon /></IconButton>}/>

                    <Menu onClick={() => this.closeNavigation()}/>
                </Drawer>
                <AppBar title={this.props.title} iconElementLeft={this.renderLeftElement()}/>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    menu: PropTypes.array.isRequired
};

export default connect(state => {
    return {
        title: state.frame.title,
        menu: state.menu
    };
})(Header);
