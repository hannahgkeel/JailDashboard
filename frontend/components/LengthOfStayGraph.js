import React, { Component } from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

let data = {
  labels: ["0", "1-3", "4-29", "30-364", "365+"],
  datasets: [
    {
      label: "Length of Stay",
      data: [8, 30, 26, 11, 8, 4],
      backgroundColor: colorscheme,
      borderColor: colorscheme,
      borderWidth: 1,
    },
  ],
};

class LengthOfStayGraph extends Component {
  render() {
    return <Bar data={data} indexAxis="x" />;
  }
}

export default LengthOfStayGraph;