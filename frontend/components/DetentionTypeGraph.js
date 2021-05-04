import React from "react";
import Bar from "./Bar";
import {colorscheme} from "../GlobalVar.js";

function DetentionTypeGraph(props) {
  let data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      Pretrial: 0,
      Sentenced: 0,
      Federal: 0,
      Other: 0,
    };

    data.forEach((entry) => {
      if (entry.status === "Pretrial") dict["Pretrial"] += 1;
      else if (entry.status === "Sentenced") dict["Sentenced"] += 1;
      else if (entry.status === "Federal") dict["Federal"] += 1;
      else dict["Other"] += 1;
    });

    const detentionTypeData = {
      labels: ["Pretrial", "Sentenced", "Federal Hold", "Other"],
      datasets: [
        {
          label: "Detention Type",
          data: [
            dict["Pretrial"],
            dict["Sentenced"],
            dict["Federal"],
            dict["Other"],
          ],
          backgroundColor: colorscheme,
          borderColor: colorscheme,
          borderWidth: 1,
        },
      ],
    };

    return detentionTypeData;
  }

  return <Bar data={formatData(data)} indexAxis="y" title="Detention Type" />;
}

export default DetentionTypeGraph;
