import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import './line-chart.less';
import * as _ from 'lodash';

class LineChart extends React.Component {
    componentDidMount() {
        this.svg = d3.select(this.root).append('svg').attr('width', '100%').attr('height', '100%');

        this.gridX = this.svg.append('g').attr('class', 'grid grid-x');
        this.gridY = this.svg.append('g').attr('class', 'grid grid-y');

        this.line = d3.line()
            .x((d, i) => {
                return this.scaleX(i)
            })
            .y((d) => {
                return this.scaleY(d.value);
            });

        this.bound_renderChart = this.renderChart.bind(this);
        window.addEventListener('resize', this.bound_renderChart);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.bound_renderChart);
    }

    componentDidUpdate() {
        this.renderChart();
    }

    getBounds() {
        return this.root.getBoundingClientRect();
    }

    renderChart() {
        if (this.props.series && this.props.series.length > 0) {
            this.scaleX = d3.scaleLinear()
                .range([0, this.getBounds().width])
                .domain([0, this.props.series.length]);

            const max = _.maxBy(this.props.series, i => i.value);
            this.scaleY = d3.scaleLinear()
                .range([0, this.getBounds().height])
                .domain([max ? max.value : 0, 0]);

            this.svg.selectAll('path').remove();
            this.svg.append('path')
                .datum(this.props.series)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', this.line);

            // Update the X gridlines
            this.gridX.attr('transform', 'translate(0,' + this.getBounds().height + ')')
                .call(
                    d3.axisBottom(this.scaleX)
                        .tickSize(-this.getBounds().height)
                        .ticks(Math.floor(this.getBounds().width / 10))

                );

            // Update the Y gridlines
            this.gridY.call(
                d3.axisLeft(this.scaleY)
                    .tickSize(-this.getBounds().width)
                    .ticks(Math.floor(this.getBounds().height / 10))
            );
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
