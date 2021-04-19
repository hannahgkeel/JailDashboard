import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";

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

function AllDetaineesGrid(props) {
  const classes = useStyles();

  //const data = props.data;

   let rawData = props.data;
   let data = [];
   let uniqueBookId = new Set();

   rawData.forEach((entry) => {
     if (!uniqueBookId.has(entry.book_id)) {
       uniqueBookId.add(entry.book_id);
       data.push(entry);
     }
   })

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
          <Paper className={classes.paper}>
            <Typography>Filters:</Typography>
          </Paper>
        </Grid>
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
      </Grid>
    </div>
  );
}

export default AllDetaineesGrid;