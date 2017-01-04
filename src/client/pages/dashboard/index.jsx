import React, {/*PropTypes*/} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../actions/frame';
import {I18n} from 'react-i18nify';
import {Grid, Row, Col} from 'react-flexbox-grid';

import './dashboard.less';
import WeatherCard from '../../components/weather-card';

/**
 * This is the index page, displayed on the '/' URL.
 */
class Dashboard extends React.Component {
    /**
     * Fetch the games
     */
    componentWillMount() {
        this.props.dispatch(setTitle(I18n.t('page.dashboard.title')));
    }

    render() {
        const pressure = {
            value: 25,
            min: 21,
            max: 30,
            avg: 26
        };

        const temperature = {
            value: 25,
            min: 23,
            max: 26,
            avg: 25
        };

        const humidity= {
            value: 44,
            min: 28,
            max: 55,
            avg: 39
        };

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Temperature" value={temperature} unit="°C"/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Humidity" value={humidity} unit="%"/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Pressure" value={pressure} unit="Psi"/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Dashboard.propTypes = {};

export default connect(/*state => {
 return {
 };
 }*/)(Dashboard);
