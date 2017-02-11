import io from 'socket.io-client';
import log from './logging';
import {addTemperature, addAggregatedTemperature} from '../actions/temperature';
import {addPressure, addAggregatedPressure} from '../actions/pressure';
import {addHumidity, addAggregatedHumidity} from '../actions/humidity';

const socket = io();

export function syncSocketEventsWithStore(store) {
    socket.on('humidity', humidity => {
        log.info(humidity);
        store.dispatch(addHumidity(humidity));
    });

    socket.on('humidityAggr', humidityAggr => {
        log.info(humidityAggr);
        store.dispatch(addAggregatedHumidity(humidityAggr));
    });

    socket.on('temperature', temperature => {
        log.info(temperature);
        store.dispatch(addTemperature(temperature));
    });

    socket.on('temperatureAggr', temperatureAggr => {
        log.info(temperatureAggr);
        store.dispatch(addAggregatedTemperature(temperatureAggr));
    });

    socket.on('pressure', pressure => {
        log.info(pressure);
        store.dispatch(addPressure(pressure));
    });

    socket.on('pressureAggr', pressureAggr => {
        log.info(pressureAggr);
        store.dispatch(addAggregatedPressure(pressureAggr));
    });
}
