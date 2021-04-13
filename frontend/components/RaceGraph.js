import React, { Component } from "react";
import Pie from "./Pie";
import colorscheme from "../GlobalVar.js";

// #fff7fb
// #ece2f0
// #d0d1e6
// #a6bddb
// #67a9cf
// #3690c0
// #02818a
// #016c59
// #014636

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
