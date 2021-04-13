import React, { Component } from "react";
import Pie from "./Pie";
import colorscheme from "../GlobalVar.js";

const data = {
  labels: [
    "Black",
    "White",
    "Other",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 70, 60],
      backgroundColor: colorscheme,
    },
  ],
};

class RaceGraph extends Component {
  render() {
    return <Pie data={data} title="Race" />;
  }
}

export default RaceGraph;
