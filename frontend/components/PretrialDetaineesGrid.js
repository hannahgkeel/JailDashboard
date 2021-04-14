import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import AgeGraph from "../components/AgeGraph";
import ChargeTypeGraph from "../components/ChargeTypeGraph";
import BondAmountGraph from "../components/BondAmountGraph";
import LengthOfStayGraph from "../components/LengthOfStayGraph";
import { Paper, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function PretrialDetaineesGrid(props) {
  const classes = useStyles();

  return (
    <div className="home pure-u-1">
      <Grid id="Grid" container spacing={2} direction="row">
        <Grid
          container
          item
          xs={6}
          sm={3}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Paper className={classes.paper}>Filters</Paper>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={9}>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <SexGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <RaceGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <AgeGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <ChargeTypeGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <BondAmountGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <LengthOfStayGraph />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ); 
}

export default PretrialDetaineesGrid;
