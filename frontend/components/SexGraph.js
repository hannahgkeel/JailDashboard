import React, { Component } from "react";
import Pie from "./Pie";
import colorscheme from "../GlobalVar.js";

const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 70],
      backgroundColor: colorscheme,
    },
  ],
};

class SexGraph extends Component {
  render() {
    return <Pie data={data} title="Sex" />;
  }
}

export default SexGraph;
