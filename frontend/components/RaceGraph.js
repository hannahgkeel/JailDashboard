import React from "react";
import Pie from "./Pie";
import colorscheme from "../GlobalVar.js";

function RaceGraph(props) {
  const data = props.data;

  function formatData(data) {
    console.log("Race graph:" + data);
    let dict = {
      White: 0,
      Black: 0,
      Other: 0,
    };

    data.forEach((entry) => {
      if (entry.race === "White") dict["White"] += 1;
      else if (entry.race === "Black") dict["Black"] += 1;
      else dict["Other"] += 1;
    });

    console.log("Racegraph2:" + dict);

    const raceData = {
      labels: ["Black", "White", "Other"],
      datasets: [
        {
          label: "Dataset 1",
          data: [dict["Black"], dict["White"], dict["Other"]],
          backgroundColor: colorscheme,
        },
      ],
    };

    console.log(raceData);

    return raceData;
  }

  return <Pie data={formatData(data)} title="Race" />;
}

export default RaceGraph;
