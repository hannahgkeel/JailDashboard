import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import AgeGraph from "../components/AgeGraph";
import ChargeTypeGraph from "../components/ChargeTypeGraph";
import BondAmountGraph from "../components/BondAmountGraph";
import LengthOfStayGraph from "../components/LengthOfStayGraph";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";

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

  //const data = props.data;

  let rawData = props.data;
  let data = [];
  let uniqueBookId = new Set();

  rawData.forEach((entry) => {
    if (!uniqueBookId.has(entry.book_id) && entry.status === "Pretrial") {
      uniqueBookId.add(entry.book_id);
      data.push(entry);
    }
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
