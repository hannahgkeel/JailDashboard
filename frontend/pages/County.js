import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import "../App.css";
import "../styles/Home.css";
import { Typography, Paper, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
              <span>{(props.location.state.all.toString()) ? 'All Detainees' : 'Pretrial Detainees'} </span>
            </Typography>
            <Typography variant="subtitle2">
            <span>{props.location.state.county}</span>
            </Typography>
          </h2>
        </div>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <SexGraph />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <RaceGraph />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <DetentionTypeGraph />
          </Paper>
        </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <AgeGraph />
        </Paper>
        </Grid>
        </Grid>
    </div>
  );
}
