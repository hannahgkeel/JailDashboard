import React, { Component } from "react";
import "../styles/Bar.css";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

class Bar extends Component {

  constructor(props) {
    super(props);
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    if (this.myBarChart !== undefined) this.myBarChart.destroy();

    const { data, title, indexAxis } = this.props;

    this.myBarChart = new Chart(this.chartRef.current, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: title,
          },
          indexAxis: indexAxis,
          scales: {
            yAxes: [
              {
                barPercentage: 0.8,
                barThickness: 400, // number (pixels) or 'flex'
                maxBarThickness: 800, // number (pixels)
              },
            ],
            xAxes: [
              {
                barPercentage: 0.8,
                barThickness: 400, // number (pixels) or 'flex'
                maxBarThickness: 800,
              },
            ],
          },
        },
      },
    });
  };

  render() {
    return (
      <div>
        <canvas
          id="Bar"
          ref={this.chartRef}
        />
      </div>
    );
  }
}

export default Bar;
