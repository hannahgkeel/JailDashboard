import React, { Component } from "react";
import Bar from "./Bar";
import colorscheme from "../GlobalVar.js";

let data = {
  labels: ["<$500", "$500-2,499", "$2,500-9,999", "$10,000-99,999", "$100,000+"],
  datasets: [
    {
      label: "Bond Amount",
      data: [3, 17, 20, 21, 8, 4],
      backgroundColor: colorscheme,
      borderColor: colorscheme,
      borderWidth: 1,
    },
  ],
};

class BondAmountGraph extends Component {
  render() {
    return <Bar data={data} indexAxis="x" />;
  }
}

export default BondAmountGraph;