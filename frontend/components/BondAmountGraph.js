import React from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

function BondAmountGraph(props) {
  const data = props.data;

  /**
   * Put data in an appropriate format for the Chart.js graph
   * @param {Object[]} data - Jail entry data
   * @returns {Object} Data for chart
   */
  function formatData(data) {
    let dict = {
      no_bond: 0,
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0,
      range5: 0,
    };

    data.forEach((entry) => {
      if (entry.bond_type !== "No bond") {
        let ba = entry.bond_amount;
        if (ba < 500) dict["range1"] += 1;
        else if (ba < 2500) dict["range2"] += 1;
        else if (ba < 10000) dict["range3"] += 1;
        else if (ba < 100000) dict["range4"] += 1;
        else dict["range5"] += 1;
      } else {
        dict["no_bond"] += 1;
      }
    });

    const bondAmountData = {
      labels: [
        "<$500",
        "$500-2,499",
        "$2,500-9,999",
        "$10,000-99,999",
        "$100,000+",
        "No Bond",
      ],
      datasets: [
        {
          label: "Bond Amount",
          data: [
            dict["range1"],
            dict["range2"],
            dict["range3"],
            dict["range4"],
            dict["range5"],
            dict["no_bond"],
          ],
          backgroundColor: colorscheme,
          borderColor: colorscheme,
          borderWidth: 1,
        },
      ],
    };
    return bondAmountData;
  }

  return (
    <Bar
      data={formatData(data)}
      indexAxis="x"
      title="Bond Amount / Release Not Authorized"
    />
  );
}

export default BondAmountGraph;
