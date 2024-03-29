import React, { useState, useEffect } from "react";
import axios from "axios";
import AllDetaineesGrid from "../components/AllDetaineesGrid";
import PretrialDetaineesGrid from "../components/PretrialDetaineesGrid";
import "../styles/Home.css";
import "../styles/County.css";
import { calculateAge, calcLenOfStay } from "../GlobalVar";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    paddingTop: theme.spacing(2),
  },
}));

export default function County(props) {
  const classes = useStyles();
  let isAllDetainees = props.location.state.all;
  let countyName = props.location.state.county.name;

  // Initialize filters in state
  const [state, setState] = useState({
    raceFilters: new Set(),
    sexFilters: new Set(),
    detentionTypeFilters: new Set(),
    ageFilters: new Set(),
    chargeTypeFilters: new Set(),
    bondAmountFilters: new Set(),
    lenOfStayFilters: new Set(),
    probationViolationFilters: new Set(),
    noBondFilter: false,
  });

  // Get county data from database by countyId
  useEffect(() => {
    // Get user's county selection
    let countyId = props.location.state.county.county_id;

    axios.get(`/county/${countyId}`).then((res) => {
      // Only keeping entries with unique book IDs
      let uniqueBookId = new Set();
      let uniqueData = [];
      res.data.forEach((entry) => {
        if (!uniqueBookId.has(entry.book_id)) {
          uniqueBookId.add(entry.book_id);
          uniqueData.push(entry);
        }
      });

      setData(uniqueData);
    });
  }, [data]);

  // If this is moved above useEffect the page will rerender infinitely.
  const [data, setData] = useState([]);

  /* 
  FUNCTIONS TO HANDLE FILTER GROUPS:
    handleRaceFilter
    handleSexFilter
    handleDetentionTypeFilter
    handleAgeFilter
    handleChargeTypeFilter
    handleBondAmountFilter
    handleLenOfStayFilter
    handleProbationViolationFilter
  */

  function handleRaceFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const race = target.name;

    let set = new Set(state.raceFilters);

    checked ? set.add(race) : set.delete(race);

    setState({ ...state, raceFilters: set });
  }

  function handleSexFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const sex = target.name;

    let set = new Set(state.sexFilters);

    checked ? set.add(sex) : set.delete(sex);

    setState({ ...state, sexFilters: set });
  }

  function handleDetentionTypeFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const detentionType = target.name;

    let set = new Set(state.detentionTypeFilters);

    checked ? set.add(detentionType) : set.delete(detentionType);

    setState({ ...state, detentionTypeFilters: set });
  }

  function handleAgeFilter(event) {
    const target = event.target;
    const checked = target.checked;

    // In the form: "range1", "range2", "range3", etc.
    const range = target.name;

    const rangeDict = {
      range1: [16, 21],
      range2: [22, 27],
      range3: [28, 37],
      range4: [38, 45],
      range5: [46, 55],
      range6: [56, 110],
    };

    let [rangeStart, rangeEnd] = rangeDict[range];

    let set = new Set(state.ageFilters);

    // Add/Delete numbers in a range from the filter set
    for (let i = rangeStart; i <= rangeEnd; i++) {
      checked ? set.add(i) : set.delete(i);
    }

    setState({ ...state, ageFilters: set });
  }

  function handleChargeTypeFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const chargeType = target.name;

    let set = new Set(state.chargeTypeFilters);

    checked ? set.add(chargeType) : set.delete(chargeType);

    setState({ ...state, chargeTypeFilters: set });
  }

  function handleBondAmountFilter(event) {
    const target = event.target;
    const checked = target.checked;

    // In the form: "range1", "range2", "range3", etc.
    const range = target.name;

    const rangeDict = {
      range1: {
        start: 0,
        end: 499,
      },
      range2: {
        start: 500,
        end: 2499,
      },
      range3: {
        start: 2500,
        end: 9999,
      },
      range4: {
        start: 10000,
        end: 99999,
      },
      range5: {
        start: 1000000,
        end: Number.MAX_SAFE_INTEGER,
      },
    };

    let set = new Set(state.bondAmountFilters);

    if (checked) {
      set.add(rangeDict[range]);
    } else {
      // Remove the range from filter set
      let start = rangeDict[range].start;
      let setArr = [...set].filter((range) => range.start !== start);
      set = new Set(setArr);
    }

    setState({ ...state, bondAmountFilters: set });
  }

  function handleLenOfStayFilter(event) {
    const target = event.target;
    const checked = target.checked;

    // In the form: "range1", "range2", "range3", etc.
    const range = target.name;

    const rangeDict = {
      range1: [0, 0],
      range2: [1, 3],
      range3: [4, 29],
      range4: [30, 364],
      range5: [365, 36500],
    };

    let [rangeStart, rangeEnd] = rangeDict[range];

    let set = new Set(state.lenOfStayFilters);

    // Add/Delete numbers in a range from the filter set
    for (let i = rangeStart; i <= rangeEnd; i++) {
      checked ? set.add(i) : set.delete(i);
    }

    setState({ ...state, lenOfStayFilters: set });
  }

  function handleProbationViolationFilter(event) {
    const target = event.target;
    const checked = target.checked;
    const probationViolation = target.name;

    let set = new Set(state.probationViolationFilters);

    checked ? set.add(probationViolation) : set.delete(probationViolation);

    setState({ ...state, probationViolationFilters: set });
  }

  /**
   * Determine if a value is between every range in a list of ranges
   * @param {Object[]} filters - Each filter represents a range
   * @param {Number} val
   * @returns {Boolean}
   */
  function isInRange(filters, val) {
    let flag = false;

    filters.forEach((range) => {
      if (val >= range.start && val <= range.end) {
        console.log("TRUE");
        flag = true;
      }
    });
    return flag;
  }

  /**
   * @returns {Object[]} New entries to display based on the selected filters
   */
  function filterData() {
    // Copy filters into new sets so they can be altered if necessary
    const {
      raceFilters,
      sexFilters,
      detentionTypeFilters,
      ageFilters,
      chargeTypeFilters,
      bondAmountFilters,
      lenOfStayFilters,
      probationViolationFilters,
    } = state;
    let rf = new Set(raceFilters);
    let sf = new Set(sexFilters);
    let df = new Set(detentionTypeFilters);
    let af = new Set(ageFilters);
    let ctf = new Set(chargeTypeFilters);
    let baf = new Set(bondAmountFilters);
    let losf = new Set(lenOfStayFilters);
    let pvf = new Set(probationViolationFilters);

    // If a set of filters is empty, it is as if all filters in the set are checked
    if (rf.size === 0) rf.add("White").add("Black").add("Other");
    if (sf.size === 0) sf.add("Male").add("Female");
    if (df.size === 0)
      df.add("Pretrial").add("Sentenced").add("Federal").add("Other");
    if (af.size === 0) for (let i = 0; i < 110; i++) af.add(i);
    if (ctf.size === 0) ctf.add("Misdemeanor").add("Felony");
    if (baf.size === 0) {
      baf
        .add({ start: 0, end: 499 })
        .add({ start: 500, end: 2499 })
        .add({ start: 2500, end: 9999 })
        .add({ start: 10000, end: 99999 })
        .add({ start: 100000, end: Number.MAX_SAFE_INTEGER });
    }
    if (losf.size === 0) for (let i = 0; i < 36500; i++) losf.add(i);
    if (pvf.size === 0) pvf.add("Probation violation").add("Other");

    // Declare a new list for the filtered data to be stored in
    let changedData = [];

    // Apply filtering and push entries to changedData
    data.forEach((entry) => {
      if (
        rf.has(entry.race) &&
        sf.has(entry.sex) &&
        df.has(entry.status) &&
        af.has(calculateAge(entry.dob)) &&
        ctf.has(entry.felony_misdemeanor) &&
        isInRange(baf, entry.bond_amount) &&
        losf.has(calcLenOfStay(entry.book_date, entry.release_date)) &&
        pvf.has(entry.charge)
      ) {
        // Entry has passed all filter checks
        changedData.push(entry);
      }
    });

    return changedData;
  }

  /**
   * Calculates jail population count for All Detainees
   * @param {Object[]} data - Entire jail data set
   * @returns {Number} Population count
   */
  function getPopulation(data) {
    let uniqueBookId = new Set();

    data.forEach((entry) => {
      let bookId = entry.book_id;
      if (!uniqueBookId.has(bookId)) uniqueBookId.add(bookId);
    });

    return uniqueBookId.size;
  }

  /**
   * Calculates jail population count for Pretrial Detainees
   * @param {Object[]} data - Entire jail data set
   * @returns {Number} Population count
   */
  function getPretrialPopulation(data) {
    let uniqueBookId = new Set();
    data.forEach((entry) => {
      let bookId = entry.book_id;
      if (!uniqueBookId.has(bookId) && entry.status === "Pretrial")
        uniqueBookId.add(bookId);
    });

    return uniqueBookId.size;
  }

  /**
   * This should be implemented when data for current detainees is made available.
   * @param {Object} event
   */
  function handleCurrentButton(event) {
    event.preventDefault();
    setData([]);
  }

  /**
   * Makes a GET request to retrieve data
   * @param {Object} event
   */
  function handleOverallButton(event) {
    event.preventDefault();
    let countyId = props.location.state.county.county_id;
    axios.get(`/county/${countyId}`).then((res) => {
      let uniqueBookId = new Set();
      let uniqueData = [];
      res.data.forEach((entry) => {
        if (!uniqueBookId.has(entry.book_id)) {
          uniqueBookId.add(entry.book_id);
          uniqueData.push(entry);
        }
      });
      setData(uniqueData);
    });
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
            <span>{countyName} County</span>
          </Typography>
        </h2>
      </div>
      <Grid id="Grid" container spacing={2} direction="row">
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <RadioGroup
              aria-label="current or overall data"
              name="current or overall data"
              defaultValue="Overall"
            >
              <FormControlLabel
                value="Current"
                control={<Radio required={true} />}
                label="Current"
                onChange={handleCurrentButton}
              />
              <FormControlLabel
                value="Overall"
                control={<Radio required={true} />}
                label="Overall"
                onChange={handleOverallButton}
              />
            </RadioGroup>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Typography style={{ textAlign: "right", alignSelf: "flex-end" }}>
              There are{" "}
              {isAllDetainees
                ? getPopulation(data)
                : getPretrialPopulation(data)}{" "}
              {isAllDetainees ? "" : "pretrial"} detainees in {countyName}{" "}
              County.
            </Typography>
            <Typography style={{ textAlign: "right", alignSelf: "flex-end" }}>
              This data was last updated on{" "}
              {new Date(props.location.state.county.updatedat).toDateString()}
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
            <Typography variant="h6">Filters:</Typography>
            <FormLabel component="legend" style={{ "text-align": "left" }}>
              <Typography className={classes.heading}>Race</Typography>
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
              <Typography className={classes.heading}>Sex</Typography>
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
                  <Typography className={classes.heading}>
                    Detention Type
                  </Typography>
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
              <Typography className={classes.heading}>Age</Typography>
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
                  <Typography className={classes.heading}>
                    Charge Type
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChargeTypeFilter}
                        name="Felony"
                      />
                    }
                    label="Felony"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChargeTypeFilter}
                        name="Misdemeanor"
                      />
                    }
                    label="Misdemeanor"
                  />
                </FormGroup>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  <Typography className={classes.heading}>
                    Bond Amount
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleBondAmountFilter}
                        name="range1"
                      />
                    }
                    label="Less than $500"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleBondAmountFilter}
                        name="range2"
                      />
                    }
                    label="$500 to $2,499"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleBondAmountFilter}
                        name="range3"
                      />
                    }
                    label="$2,500 to $9,999"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleBondAmountFilter}
                        name="range4"
                      />
                    }
                    label="$10,000 to 99,999"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleBondAmountFilter}
                        name="range5"
                      />
                    }
                    label="$100,000+"
                  />
                </FormGroup>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  <Typography className={classes.heading}>
                    Length of Stay
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleLenOfStayFilter}
                        name="range1"
                      />
                    }
                    label="Less than 1 day"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleLenOfStayFilter}
                        name="range2"
                      />
                    }
                    label="1-3 days"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleLenOfStayFilter}
                        name="range3"
                      />
                    }
                    label="4-29 days"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleLenOfStayFilter}
                        name="range4"
                      />
                    }
                    label="30-364 days"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleLenOfStayFilter}
                        name="range5"
                      />
                    }
                    label="365+ days"
                  />
                </FormGroup>
                <FormLabel component="legend" style={{ "text-align": "left" }}>
                  <Typography className={classes.heading}>
                    Probation Violation
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleProbationViolationFilter}
                        name="Probation violation"
                      />
                    }
                    label="Yes"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleProbationViolationFilter}
                        name="Other"
                      />
                    }
                    label="No"
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
