import React from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

function ChargeTypeGraph(props) {
  const data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      Misdemeanor: 0,
      Felony: 0,
    };

    data.forEach((entry) => {
      if (entry.felony_misdemeanor === "Misdemeanor") dict["Misdemeanor"] += 1;
      else dict["Felony"] += 1;
    });

    let chargeTypeData = {
      labels: ["Misdemeanor", "Felony"],
      datasets: [
        {
          label: "Charge Type",
          labels: ["Misdemeanor", "Felony"],
          data: [dict["Misdemeanor"], dict["Felony"]],
          backgroundColor: colorscheme,
          borderColor: colorscheme,
          borderWidth: 1,
        },
      ],
    };

    return chargeTypeData;
  }

  return <Bar data={formatData(data)} indexAxis="y" title="Charge Type" />;
}

export default ChargeTypeGraph;
