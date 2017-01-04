import React/*, { PropTypes }*/ from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/frame';

/**
 * This is the index page, displayed on the '/' URL.
 */
class Dashboard extends React.Component {
    /**
     * Fetch the games
     */
    componentWillMount() {
        this.props.dispatch(setTitle('Dashboard'));
    }

    render() {
        return (
            <h1>Dashboard</h1>
        );
    }
}

Dashboard.propTypes = {
};

export default connect(/*state => {
    return {
    };
}*/)(Dashboard);
