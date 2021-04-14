import React, { Component } from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

let data = {
  labels: ["Misdemeanor", "Felony"],
  datasets: [
    {
      label: "Charge Type",
      labels: ["Misdemeanor", "Felony"],
      data: [33, 20],
      backgroundColor: colorscheme,
      borderColor: colorscheme,
      borderWidth: 1,
    },
  ],
};

class ChargeTypeGraph extends Component {
  render() {
    return <Bar data={data} indexAxis="y" title="Charge Type" />;
  }
}

export default ChargeTypeGraph;
