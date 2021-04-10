import React, { Component } from "react";
import '../styles/SexGraph.css'
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
    Tooltip
  } from 'chart.js';

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

let myPieChart;

//--Chart Style Options--//
// Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

const data = {
    labels: ['Male', 'Female'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [50, 70],
            backgroundColor: ['orange', 'brown'],
        }
    ]
}

class SexGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        // const { data, average, labels } = this.props;

        if (typeof myPieChart !== "undefined") myPieChart.destroy();

        myPieChart = new Chart(myChartRef, {
            type: 'pie',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Sex'
                }
              }
            },
        });

    }

    render() {
        return  (
            <div>
                <canvas
                    id="SexGraph"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default SexGraph;