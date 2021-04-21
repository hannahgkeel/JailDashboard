import React, { useState, useEffect } from "react";
import axios from "axios";
import AllDetaineesGrid from "../components/AllDetaineesGrid";
import PretrialDetaineesGrid from "../components/PretrialDetaineesGrid";
import "../styles/Home.css";
import "../styles/County.css";
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

export default function County(props) {
  const classes = useStyles();
  let isAllDetainees = props.location.state.all;

  // Initialize filters in state
  const [state, setState] = useState({
    raceFilters: new Set(),
    sexFilters: new Set(),
    detentionTypeFilters: new Set(),
    ageFilters: new Set(),
  });

  // Get county data from database by countyId
  useEffect(() => {
    let countyId = props.location.state.county.county_id;
    axios.get(`/county/${countyId}`).then((res) => {
      setData(res.data);
    });
  }, [data]);

  const [data, setData] = useState([]);

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
      <div className="home-header pure-g">
        <h2 className="title pure-u-1">
          <Typography variant="h4" font-weight="bold" text-align="center">
            <span>
              {isAllDetainees ? "All Detainees" : "Pretrial Detainees"}{" "}
            </span>
          </Typography>
          <Typography variant="subtitle2">
            <span>{props.location.state.county.name} County</span>
          </Typography>
        </h2>
      </div>
      <Grid id="Grid" container spacing={2} direction="row">
        <Grid item xs={12}>
          <Paper>
            <Typography style={{ textAlign: "right", alignSelf: "flex-end" }}>
              There are currently XYZ {isAllDetainees ? "" : "pretrial"}{" "}
              detainees in Orange County.
            </Typography>
            <Typography style={{ textAlign: "right", alignSelf: "flex-end" }}>
              This data was last updated on 00/00/2021
            </Typography>
          </Paper>
        </Grid>
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

            {isAllDetainees ? (
              <span>
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
                    label="Federal Hold"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleDetentionTypeFilter}
                        name="Other"
                      />
                    }
                    label="Other"
                  />
                </FormGroup>
              </span>
            ) : (
              ""
            )}
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              Age
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range1" />}
                label="16-21 years"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range2" />}
                label="22-27 years"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range3" />}
                label="28-37 years"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range4" />}
                label="38-45 years"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range5" />}
                label="46-55 years"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleAgeFilter} name="range6" />}
                label="56+ years"
              />
            </FormGroup>

            {/* Pretrial ONLY filters */}

            {isAllDetainees ? (
              ""
            ) : (
              <span>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  Charge Type
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="Felony" />}
                    label="Felony"
                  />
                  <FormControlLabel
                    control={<Checkbox name="Misdemeanor" />}
                    label="Misdemeanor"
                  />
                </FormGroup>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  Bond Amount
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="range1" />}
                    label="Less than $500"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range2" />}
                    label="$500 to $2,499"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range3" />}
                    label="$2,500 to $9,999"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range4" />}
                    label="$10,000 to 99,999"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range4" />}
                    label="$100,000+"
                  />
                </FormGroup>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  Length of Stay
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="range1" />}
                    label="Less than 1 day"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range2" />}
                    label="1-3 days"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range3" />}
                    label="4-29 days"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range4" />}
                    label="30-364 days"
                  />
                  <FormControlLabel
                    control={<Checkbox name="range5" />}
                    label="365+ days"
                  />
                </FormGroup>
              </span>
            )}
          </Paper>
        </Grid>

        {isAllDetainees ? (
          <AllDetaineesGrid data={filterData()} />
        ) : (
          <PretrialDetaineesGrid data={filterData()} />
        )}
      </Grid>
    </div>
  );
}
