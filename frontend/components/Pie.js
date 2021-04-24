import React, { Component } from "react";
import "../styles/Pie.css";
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

class Pie extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    if (this.myPieChart !== undefined) this.myPieChart.destroy();

    this.myPieChart = new Chart(this.chartRef.current, {
      type: "pie",
      data: this.props.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            onClick: null,
          },
          title: {
            display: true,
            text: this.props.title,
          },
        },
      },
    });
  };

  render() {
    return (
      <div>
        <canvas id="Pie" ref={this.chartRef} />
      </div>
    );
  }
}

export default Pie;
