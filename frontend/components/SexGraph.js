import React from "react";
import Pie from "./Pie";
import {colorscheme} from "../GlobalVar.js";

function SexGraph(props) {
  const data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      Male: 0,
      Female: 0,
    };
    data.forEach((entry) => {
      if (entry.sex === "Male") dict["Male"] += 1;
      else if (entry.sex === "Female") dict["Female"] += 1;
    });

    let arr = [dict["Male"], dict["Female"]];

    const pieData = {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Dataset 1",
          data: arr,
          backgroundColor: colorscheme,
        },
      ],
    };

    return pieData;
  }

  return <Pie data={formatData(data)} title="Sex" />;
}

export default SexGraph;
