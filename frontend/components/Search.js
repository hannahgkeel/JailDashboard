import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Search.css";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Typography,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

export default function Search() {
  let history = useHistory();

  useEffect(() => {
    axios
      .get("/county_names")
      .then((res) => {
        setCounties(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [counties]);

  const [counties, setCounties] = useState([]);

  // Initialize state
  const [state, setState] = useState({
    county: {},
    all: false,
    pretrial: false,
  });

  const handleChange = (event, value) => {
    setState({ ...state, county: value });
  };

  const handleRadioBtnChange = (event) => {
    if (event.target.value === "all") {
      setState({ ...state, all: true, pretrial: false });
    } else {
      setState({ ...state, all: false, pretrial: true });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/county",
      state: state,
    });
    console.log("Submit button pressed.");
  };

  return (
    <div className="search-div pure-u-11-12 pure-u-md-1-2 pure-g">
      <Typography variant="h6">Search by county name</Typography>
      <div className="search-input pure-u-1 pure-u-md-2-3">
        <form onSubmit={handleSubmit} style={{ width: 300 }}>
          <Autocomplete
            id="combo-box-demo"
            options={counties}
            getOptionLabel={(counties) => counties.name}
            style={{ width: 300 }}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                variant="outlined"
                required
              />
            )}
          />
          <RadioGroup
            aria-label="detainee-type"
            name="detainee-type"
            onChange={handleRadioBtnChange}
          >
            <FormControlLabel
              value="all"
              control={<Radio required={true} />}
              label="All Detainees"
            />
            <FormControlLabel
              value="pretrial"
              control={<Radio required={true} />}
              label="Pretrial Detainees"
            />
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}

// const counties = [{ name: "Orange County" }, { name: "Forsyth County" }];
