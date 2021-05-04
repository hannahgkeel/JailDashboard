import React from "react";
import Pie from "./Pie";
import {colorscheme} from "../GlobalVar.js";

function RaceGraph(props) {
  const data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      White: 0,
      Black: 0,
      Other: 0,
    };

    data.forEach((entry) => {
      if (entry.race === "White") dict["White"] += 1;
      else if (entry.race === "Black") dict["Black"] += 1;
      else dict["Other"] += 1;
    });

    const raceData = {
      labels: ["Black", "White", "Other"],
      datasets: [
        {
          label: "Dataset 1",
          data: [dict["Black"], dict["White"], dict["Other"]],
          backgroundColor: colorscheme,
        },
      ],
    };
    return raceData;
  }

  return <Pie data={formatData(data)} title="Race" />;
}

export default RaceGraph;
