import React from 'react';
import PropTypes from 'prop-types';
import ChartJS from 'chart.js';
import Constants from './Constants';
import * as Utils from './Utils';

const objectPath = require('object-path');

class Chart extends React.Component {

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate() {
    // this.state.chart.destroy();
    this.initChart();
  }


  initChart() {
    const {
      id,
      // budgets,
      // maxValue,
      // onClick,
      period: { from, to },
      results,
      metrics,
    } = this.props;
    const dateFrom = from.getTime();
    const dateTo = to.getTime();
    const timestamps = Utils.getTimestampsByInterval(results, dateFrom, dateTo);
    const datasets = [];
    metrics.forEach((metricPath) => {
      console.log('metricPath ', metricPath)
      const metric = objectPath.get(Constants.metrics, metricPath);
      console.log('metric ', metric);
      const values = timestamps.map((timestamp) => {
        console.log(timestamp);
        let value = objectPath.get(results[timestamp], metricPath);

        if (typeof metric.transform === 'function') {
          value = metric.transform(value);
        }

        return value;
      });
      console.log(values);

      const barCtx = document.getElementById(`chart${id}`).getContext('2d');
      const gradient = barCtx.createLinearGradient(0, 0, 0, 300);
      const { color } = metric;
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`); // show this color at 0%;
      gradient.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.25)`); // show this color at 50%;
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`); // show this color at 100%;
      datasets.push({
        backgroundColor: gradient, // Utils.getColor(metric.color, 0.5),
        borderColor: Utils.getColor(metric.color, 1),
        pointBackgroundColor: Utils.getColor(color, 1),
        pointBorderColor: 'rgba(255, 255, 255, 0)',
        pointHoverBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        data: values,
        label: metric.name,
        lineTension: 0.5,
        pointRadius: 4,
      });
    });

    // const lineChart = ChartJS.controllers.line.prototype.draw;

    // ChartJS.helpers.extend(ChartJS.controllers.line.prototype, {
    //   draw(...args) {
    //     lineChart.apply(this, args);

    //     const { chart: { chart: { ctx } }, chart } = this;

    //     const lineStart = chart.scales['x-axis-0'].left;
    //     const lineEnd = lineStart + chart.scales['x-axis-0'].width;

    //     chart.config.data.budgets.forEach((budget) => {
    //       const metric = objectPath.get(Constants.metrics, budget.metric);
    //       let value = budget.max || budget.min;

    //       if (value) {
    //         if (typeof metric.transform === 'function') {
    //           value = metric.transform(value);
    //         }

    //         const yValue = chart.scales['y-axis-0'].getPixelForValue(value);

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.moveTo(lineStart, yValue);
    //         ctx.strokeStyle = '#ff0000';
    //         ctx.lineTo(lineEnd, yValue);
    //         ctx.stroke();

    //         ctx.restore();
    //       }
    //     });
    //   },
    // });

    // const labels = timestamps.map(timestamp => timestamp * 1000);
    // const target = document.getElementById(`chart${id}`).getContext('2d');
    // /* eslint-disable no-new */
    // const chart = new ChartJS(target, {
    //   type: 'line',
    //   data: {
    //     labels,
    //     datasets,
    //     budgets,
    //   },
    //   options: {
    //     onClick,
    //     scales: {
    //       xAxes: [{
    //         type: 'time',
    //         time: {
    //           displayFormats: {
    //             unit: 'month',
    //           },
    //           min: labels[0],
    //           max: labels[labels.length - 1],
    //         },
    //         gridLines: {
    //           color: 'rgba(0, 0, 0, 0)',
    //         },
    //       }],
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true,
    //           max: maxValue,
    //         },
    //         gridLines: {
    //           color: 'rgba(0, 0, 0, 0)',
    //         },
    //       }],
    //     },
    //     tooltips: {
    //       enabled: true,
    //       mode: 'label',
    //       backgroundColor: 'rgba(255, 255, 255, 0.8)',
    //       titleFontColor: 'rgb(0, 0, 0)',
    //       bodyFontColor: 'rgb(0, 0, 0)',
    //       callbacks: {
    //         title: (tooltipItems) => {
    //           const date = new Date(tooltipItems[0].xLabel);
    //           const year = date.getFullYear();
    //           const month = date.getMonth() + 1;
    //           const day = date.getDate();
    //           const hours = date.getHours();
    //           const minutes = date.getMinutes();
    //           const seconds = date.getSeconds();

    //           return `${day}/${month}/${year} @ ${hours}:${minutes}:${seconds}`;
    //         },
    //       },
    //       position: 'nearest',
    //     },
    //   },
    // });

    const ctx = document.getElementById(`chart${id}`).getContext('2d');
    const myChart = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  render() {
    const {
      footNote,
      results,
      id,
    } = this.props;
    const placeholderClass = '';// (Object.keys(results) < 2) ? ' c-Chart--placeholder' : '';

    return (
      <div className={`c-Chart${placeholderClass}`}>
        <canvas id={`chart${id}`} width="400" height="250" />
        {
          footNote
          && <p className="c-Chart__footer">{footNote}</p>
        }
      </div>
    );
  }
}

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  footNote: PropTypes.object.isRequired,
  maxValue: PropTypes.number,
  budgets: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  period: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  metrics: PropTypes.array.isRequired,
};

Chart.defaultProps = {
  maxValue: undefined,
};


export default Chart;
