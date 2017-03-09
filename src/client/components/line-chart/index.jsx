import React, {PropTypes} from 'react';
import * as d3 from 'd3';
import './line-chart.less';

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

        this.chartG = this.svg.append('g')
            .attr('class', 'chart-content');

        this.mouseG = this.svg.append('g')
            .attr('class', 'mouse-over-effects');

        this.mouseG.append('path') // this is the black vertical line to follow mouse
            .attr('class', 'mouse-line')
            .style('stroke', 'black')
            .style('stroke-width', '1px')
            .style('opacity', '0');

        this.mouseG.append('circle') // this is the black vertical line to follow mouse
            .attr('r', 7)
            .style('stroke', 'green')
            .style('fill', 'none')
            .style('stroke-width', '1px')
            .style('opacity', '0');

        this.mouseG.append('text').style('opacity', '0');

        const that = this;
        this.mouseG.append('rect') // append a rect to catch mouse movements on canvas
            .attr('width', '100%') // can't catch mouse events on a g element
            .attr('height', '100%')
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', () => { // on mouse out hide line, circles and text
                that.mouseG.select('.mouse-line').transition().style('opacity', '0');
                that.mouseG.selectAll('circle').transition().style('opacity', 0);
                that.mouseG.selectAll('text').transition().style('opacity', 0);
            })
            .on('mouseover', () => { // on mouse in show line, circles and text
                that.mouseG.select('.mouse-line').transition().style('opacity', '1');
                that.mouseG.selectAll('circle').transition().style('opacity', 1);
                that.mouseG.selectAll('text').transition().style('opacity', 1);
            })
            .on('mousemove', function () { // mouse moving over canvas
                const mouse = d3.mouse(this);
                let idx = Math.round(that.scaleX.invert(mouse[0]));
                idx = that.props.series.length > idx ? idx : that.props.series.length - 1;
                const d = that.props.series[idx];

                that.mouseG.select('.mouse-line')
                    .attr('d', () => {
                        let d = 'M' + mouse[0] + ',' + that.getBounds().height;
                        d += ' ' + mouse[0] + ',' + 0;
                        return d;
                    });
                that.mouseG.select('circle').attr('cx', mouse[0]).attr('cy', that.scaleY(d.value));
                that.mouseG.select('text').attr('x', function () {
                    const length = this.getComputedTextLength();
                    const x = d3.mouse(this)[0];
                    let newX = x + 10;
                    if (newX + length > that.getBounds().width) {
                        newX = x - 10 - length;
                    }
                    return newX;
                }).attr('y', function () {
                    return that.scaleY(d.value) + 20;
                }).text(`${d.value.toFixed(2)} ${d.unit}`)
                    .each(function () {

                    });
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

            this.scaleY = d3.scaleLinear()
                .range([0, this.getBounds().height])
                .domain([this.props.max, 0]);

            this.chartG.selectAll('path').remove();
            this.chartG.append('path')
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
    series: PropTypes.array.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default LineChart;
