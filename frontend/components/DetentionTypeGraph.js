import React, { Component } from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

let data = {
  labels: ["Pretrial", "Sentence", "Federal", "Other"],
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
  render() {
    return <Bar data={data} indexAxis="y" title="Detention Type"/>;
  }
}

export default DetentionTypeGraph;
