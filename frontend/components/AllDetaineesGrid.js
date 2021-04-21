import React, { useState } from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import { calculateAge } from "../GlobalVar";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@material-ui/core";

const MAX_AGE = 110;

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

  let rawData = props.data;
  let data = [];
  let uniqueBookId = new Set();

  rawData.forEach((entry) => {
    if (!uniqueBookId.has(entry.book_id)) {
      uniqueBookId.add(entry.book_id);
      data.push(entry);
    }
  });

  const [state, setState] = useState({
    raceFilters: new Set(),
    sexFilters: new Set(),
    detentionTypeFilters: new Set(),
    ageFilters: new Set(),
  });

  // Handle individual filters functions
  function handleRaceFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    let set = new Set(state.raceFilters);

    checked ? set.add(name) : set.delete(name);

    setState({ ...state, raceFilters: set });
  }

  function handleSexFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    let set = new Set(state.sexFilters);

    checked ? set.add(name) : set.delete(name);

    setState({ ...state, sexFilters: set });
  }

  function handleDetentionTypeFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    let set = new Set(state.detentionTypeFilters);

    checked ? set.add(name) : set.delete(name);

    setState({ ...state, detentionTypeFilters: set });
  }

  function handleAgeFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const range = target.name;

    const rangeDict = {
      range1: [16, 21],
      range2: [22, 27],
      range3: [28, 37],
      range4: [38, 45],
      range5: [46, 55],
      range6: [56, MAX_AGE],
    };

    let [rangeStart, rangeEnd] = rangeDict[range];
    console.log("rangeStart: " + rangeStart + " ,rangeEnd: " + rangeEnd);

    let set = new Set(state.ageFilters);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      checked ? set.add(i) : set.delete(i);
    }

    setState({ ...state, ageFilters: set });
  }

  // filterData: returns a new data set according to selected filters
  function filterData() {
    const { raceFilters, sexFilters, detentionTypeFilters, ageFilters } = state;
    let rf = new Set(raceFilters);
    let sf = new Set(sexFilters);
    let df = new Set(detentionTypeFilters);
    let af = new Set(ageFilters);

    // If a set of filters is empty, all should be included
    if (rf.size === 0) rf.add("White").add("Black").add("Other");
    if (sf.size === 0) sf.add("Male").add("Female");
    if (df.size === 0)
      df.add("Pretrial").add("Sentenced").add("Federal").add("Other");
    if (af.size === 0) for (let i = 0; i < MAX_AGE; i++) af.add(i);

    let changedData = [];

    data.forEach((entry) => {
      if (
        rf.has(entry.race) &&
        sf.has(entry.sex) &&
        df.has(entry.status) &&
        af.has(calculateAge(entry.dob))
      ) {
        console.log("Entry:" + entry);
        changedData.push(entry);
      }
    });

    return changedData;
  }

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
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              Race
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleRaceFilter} name="White" />}
                label="White"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleRaceFilter} name="Black" />}
                label="Black"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleRaceFilter} name="Other" />}
                label="Other"
              />
            </FormGroup>
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              Sex
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleSexFilter} name="Male" />}
                label="Male"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleSexFilter} name="Female" />}
                label="Female"
              />
            </FormGroup>
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              Detention Type
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleDetentionTypeFilter}
                    name="Pretrial"
                  />
                }
                label="Pretrial"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleDetentionTypeFilter}
                    name="Sentenced"
                  />
                }
                label="Sentenced"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleDetentionTypeFilter}
                    name="Federal"
                  />
                }
                label="Federal"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleDetentionTypeFilter} name="Other" />
                }
                label="Other"
              />
            </FormGroup>
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              Age
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range1" />}
                label="16 - 21"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range2" />}
                label="22 - 27"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range3" />}
                label="28 - 37"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range4" />}
                label="38 - 45"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range5" />}
                label="46 - 55"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range6" />}
                label="56+"
              />
            </FormGroup>
          </Paper>
        </Grid>
        <Grid container item spacing={2} xs={12} sm={9}>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <SexGraph data={filterData()} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <RaceGraph data={filterData()} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <DetentionTypeGraph data={filterData()} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="County-graph">
              <AgeGraph data={filterData()} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AllDetaineesGrid;
