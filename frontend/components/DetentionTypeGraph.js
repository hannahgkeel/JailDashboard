import React, { Component } from "react";
import colorscheme from "../GlobalVar.js"
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

let data = {
  labels: ["Pretrial", "Sentence", "Federal"],
  datasets: [
    {
      label: "Detention Type",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: colorscheme,
      borderColor: colorscheme,
      borderWidth: 1,
    },
  ],
};

class DetentionTypeGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");

    let myBarChart = new Chart(myChartRef, {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
      },
    });
  };

  render() {
    return (
      <div>
        <canvas
          id="Bar"
          ref={this.chartRef}
          style={{ "max-width": "500px", maxHeight: "700px", margin: "0 auto" }}
        />
      </div>
    );
  }
}

export default DetentionTypeGraph;
