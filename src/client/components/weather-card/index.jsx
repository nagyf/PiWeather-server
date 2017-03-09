import React, {PropTypes} from 'react';
import {Card, CardText, CardHeader} from 'material-ui';
import {Row} from 'react-flexbox-grid';
import LineChart from '../line-chart';

class WeatherCard extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title={this.props.title}/>
                <CardText>
                    <Row middle="xs" center="xs">
                        <p className="primary">{this.props.value.value} {this.props.unit}</p>
                        <div className="secondary-block">
                            <p className="secondary">Avg: {this.props.value.avg} {this.props.unit}</p>
                            <p className="secondary">Min: {this.props.value.min} {this.props.unit}</p>
                            <p className="secondary">Max: {this.props.value.max} {this.props.unit}</p>
                        </div>
                    </Row>
                    <Row>
                        <LineChart series={this.props.series} min={this.props.value.min} max={this.props.value.max}/>
                    </Row>
                </CardText>
            </Card>
        );
    }
}

WeatherCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    unit: PropTypes.string.isRequired,
    series: PropTypes.array.isRequired
};

export default WeatherCard;
