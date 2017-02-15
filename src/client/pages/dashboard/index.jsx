import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../actions/frame';
import {I18n} from 'react-i18nify';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {getAggregatedTemp, getTemperatureSeries} from '../../actions/temperature';
import {getAggregatedHumidity, getHumiditySeries} from '../../actions/humidity';
import {getAggregatedPressure, getPressureSeries} from '../../actions/pressure';
import _ from 'lodash';

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
        // Load temperature data
        this.props.dispatch(getAggregatedTemp());
        this.props.dispatch(getTemperatureSeries());

        // Load humidity data
        this.props.dispatch(getAggregatedHumidity());
        this.props.dispatch(getHumiditySeries());

        // Load pressure data
        this.props.dispatch(getAggregatedPressure());
        this.props.dispatch(getPressureSeries());

        this.props.dispatch(setTitle(I18n.t('page.dashboard.title')));
    }

    static getData(aggregated) {
        if (_.isEmpty(aggregated)) {
            return {
                value: 0,
                min: 0,
                max: 0,
                avg: 0
            };
        } else {
            return {
                value: aggregated.current.toFixed(1),
                min: aggregated.min.toFixed(1),
                max: aggregated.max.toFixed(1),
                avg: (aggregated.sum / aggregated.count).toFixed(1)
            };
        }
    }

    render() {
        const temperature = Dashboard.getData(this.props.temperatureAggregated);
        const humidity = Dashboard.getData(this.props.humidityAggregated);
        const pressure = Dashboard.getData(this.props.pressureAggregated);

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Temperature" value={temperature}
                                     unit={this.props.temperatureAggregated.unit || ''}
                                     series={this.props.temperatureSeries}/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Humidity" value={humidity} unit={this.props.humidityAggregated.unit || ''}
                                     series={this.props.humiditySeries}/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <WeatherCard title="Pressure" value={pressure} unit={this.props.pressureAggregated.unit || ''}
                                     series={this.props.pressureSeries}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    temperatureAggregated: PropTypes.object.isRequired,
    humidityAggregated: PropTypes.object.isRequired,
    pressureAggregated: PropTypes.object.isRequired,
    temperatureSeries: PropTypes.array.isRequired,
    humiditySeries: PropTypes.array.isRequired,
    pressureSeries: PropTypes.array.isRequired
};

export default connect(state => {
    return {
        temperatureAggregated: state.temperature.aggregated,
        temperatureSeries: state.temperature.series,

        humidityAggregated: state.humidity.aggregated,
        humiditySeries: state.humidity.series,

        pressureAggregated: state.pressure.aggregated,
        pressureSeries: state.pressure.series
    };
})(Dashboard);
