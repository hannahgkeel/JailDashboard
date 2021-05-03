import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import AgeGraph from "../components/AgeGraph";
import ChargeTypeGraph from "../components/ChargeTypeGraph";
import BondAmountGraph from "../components/BondAmountGraph";
import LengthOfStayGraph from "../components/LengthOfStayGraph";
import { Paper, Grid } from "@material-ui/core";

function PretrialDetaineesGrid(props) {
  let rawData = props.data;
  let data = [];

  // Only display data for pretrial detainees
  rawData.forEach((entry) => {
    if (entry.status === "Pretrial") data.push(entry);
  });

  return (
    <Grid container item spacing={2} xs={12} sm={9}>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <SexGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <RaceGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <AgeGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <ChargeTypeGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <BondAmountGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <LengthOfStayGraph data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PretrialDetaineesGrid;
