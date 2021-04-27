import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import { Paper, Grid } from "@material-ui/core";

function AllDetaineesGrid(props) {
  let data = props.data;

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
          <DetentionTypeGraph data={data} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="County-graph">
          <AgeGraph data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AllDetaineesGrid;
