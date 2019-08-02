import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import ChartJS from 'chart.js';
import Constants from './Constants';
import * as Utils from './Utils';

const objectPath = require('object-path');

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      labels: [],
      options: {
        tooltips: {
          caretSize: 0,
          titleFontSize: 15,
          bodyFontSize: 14,
          position: 'nearest',
          mode: 'index',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleFontColor: 'rgb(0, 0, 0)',
          bodyFontColor: 'rgb(0, 0, 0)',
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
      },
    };
  }

  componentDidMount() {
    this.initChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initChart(nextProps);
  }


  initChart = (nextProps) => {
    const {
      id,
      // budgets,
      // maxValue,
      // onClick,
      period: { from, to },
      results,
      metrics,
    } = nextProps;
    const dateFrom = from.getTime();
    const dateTo = to.getTime();

    const timestamps = Utils.getTimestampsByInterval(results, dateFrom, dateTo);
    const labels = timestamps.map(({ date }) => (
      moment(new Date(date * 1000)).format('MMMM Do YYYY, kk:mm')
    ));
    const datasets = [];
    metrics.forEach((metricPath) => {
      const metric = objectPath.get(Constants.metrics, metricPath);
      const values = timestamps.map(({ date }) => {
        let value = [];
        results.forEach((element) => {
          if (element.date === date) {
            value = objectPath.get(element, metricPath);
          }
        });

        if (typeof metric.transform === 'function') {
          value = metric.transform(value);
        }

        return value;
      });
      const barCtx = document.getElementById(`chart${id}`).getContext('2d');
      const gradient = barCtx.createLinearGradient(0, 0, 0, barCtx.canvas.height);
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
    this.setState({
      datasets,
      labels,
    });
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
  }

  render() {
    const {
      footNote,
      id,
      results,
    } = this.props;
    const { labels, datasets, options } = this.state;
    const placeholderClass = (Object.keys(results) < 2) ? ' c-Chart--placeholder' : '';

    return (
      <div className={`c-Chart${placeholderClass}`}>
        <Line
          id={`chart${id}`}
          data={{
            datasets,
            labels,
          }}
          options={options}
        />
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
