import React, { Component } from "react";
import Pie from "./Pie";

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
      backgroundColor: ["orange", "brown", "blue"],
    },
  ],
};

class RaceGraph extends Component {
  render() {
    return <Pie data={data} title="Race" />;
  }
}

export default RaceGraph;
