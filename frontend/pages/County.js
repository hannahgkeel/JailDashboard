import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import "../App.css";
import "../styles/Home.css";
import "../styles/County.css";
import { Typography, Paper, Grid, makeStyles } from "@material-ui/core";

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

export default function County(props) {
  const classes = useStyles();

  return (
    <div className="home pure-u-1">
      <div className="home-header pure-g">
        <h2 className="title pure-u-1">
          <Typography variant="h4" font-weight="bold" text-align="center">
            <span>
              {props.location.state.all.toString()
                ? "All Detainees"
                : "Pretrial Detainees"}{" "}
            </span>
          </Typography>
          <Typography variant="subtitle2">
            <span>{props.location.state.county}</span>
          </Typography>
        </h2>
      </div>
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
          {/* <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        > */}
          <Grid item xs={6}>
            <Paper className="County-graph">
              <SexGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <RaceGraph />
            </Paper>
            {/* </Grid> */}
          </Grid>
          {/* <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-end"
        > */}
          <Grid item xs={6}>
            <Paper className="County-graph">
              <DetentionTypeGraph />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <AgeGraph />
            </Paper>
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
