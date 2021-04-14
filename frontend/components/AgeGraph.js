import React, { Component } from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

let data = {
  labels: ["16-21", "22-27", "28-37", "38-45", "46-55", "56+"],
  datasets: [
    {
      label: "Age",
      data: [2, 10, 28, 22, 2, 1],
      backgroundColor: colorscheme,
      borderColor: colorscheme,
      borderWidth: 1,
    },
  ],
};

class AgeGraph extends Component {
  render() {
    return <Bar data={data} indexAxis="x" title="Age" />;
  }
}

export default AgeGraph;
