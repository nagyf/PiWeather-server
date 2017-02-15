import React, {PropTypes} from 'react';
import * as d3 from 'd3';
import './line-chart.less';
import * as _ from 'lodash';

class LineChart extends React.Component {
    componentDidMount() {
        this.svg = d3.select(this.root).append('svg').attr('width', '100%').attr('height', '100%');

        this.line = d3.line()
            .x((d, i) => {
                return this.scaleX(i)
            })
            .y((d) => {
                return this.scaleY(d.value);
            });

        this.svg.append('path')
            .datum([])
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', this.line);

        this.bound_renderChart = this.renderChart.bind(this);
        window.addEventListener('resize', this.bound_renderChart);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.bound_renderChart);
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        if (this.props.series && this.props.series.length > 0) {
            this.scaleX = d3.scaleLinear()
                .range([0, this.root.getBoundingClientRect().width])
                .domain([0, this.props.series.length]);

            const max = _.maxBy(this.props.series, i => i.value);
            this.scaleY = d3.scaleLinear()
                .range([0, this.root.getBoundingClientRect().height])
                .domain([max ? max.value : 0, 0]);

            this.svg.select('path').datum(this.props.series).attr('d', this.line);
        }
    }

    render() {
        return (
            <div className='chart-wrapper line-chart' ref={root => this.root = root}></div>
        );
    }
}

LineChart.propTypes = {
    series: PropTypes.array.isRequired
};

export default LineChart;
