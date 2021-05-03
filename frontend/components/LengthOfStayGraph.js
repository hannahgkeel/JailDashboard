import React from "react";
import Bar from "./Bar";
import { calcLenOfStay, colorscheme } from "../GlobalVar.js";

function LengthOfStayGraph(props) {
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
    };

    data.forEach((entry) => {
      let len = calcLenOfStay(entry.book_date, entry.release_date);
      if (len < 1) dict["range1"] += 1;
      else if (len < 4) dict["range2"] += 1;
      else if (len < 30) dict["range3"] += 1;
      else if (len < 365) dict["range4"] += 1;
      else dict["range5"] += 1;
    });

    const lenOfStayData = {
      labels: ["0", "1-3", "4-29", "30-364", "365+"],
      datasets: [
        {
          data: [
            dict["range1"],
            dict["range2"],
            dict["range3"],
            dict["range4"],
            dict["range5"],
          ],
          backgroundColor: colorscheme,
          borderColor: colorscheme,
          borderWidth: 1,
        },
      ],
    };

    return lenOfStayData;
  }

  return <Bar data={formatData(data)} indexAxis="x" title="Length of Stay" />;
}

export default LengthOfStayGraph;
