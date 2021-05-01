import React from "react";
import Bar from "./Bar";
import { calculateAge, colorscheme } from "../GlobalVar.js";

function AgeGraph(props) {
  const data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0,
      range5: 0,
      range6: 0,
    };

    data.forEach((entry) => {
      let age = calculateAge(entry.dob);
      if (age < 22) dict["range1"] += 1;
      else if (age < 28) dict["range2"] += 1;
      else if (age < 38) dict["range3"] += 1;
      else if (age < 46) dict["range4"] += 1;
      else if (age < 56) dict["range5"] += 1;
      else dict["range6"] += 1;
    });

    const ageData = {
      labels: ["16-21", "22-27", "28-37", "38-45", "46-55", "56+"],
      datasets: [
        {
          label: "Age",
          data: [
            dict["range1"],
            dict["range2"],
            dict["range3"],
            dict["range4"],
            dict["range5"],
            dict["range6"],
          ],
          backgroundColor: colorscheme,
          borderColor: colorscheme,
          borderWidth: 1,
        },
      ],
    };

    return ageData;
  }
  return <Bar data={formatData(data)} indexAxis="x" title="Age" />;
}

export default AgeGraph;
