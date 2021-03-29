import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../styles/Search.css";
import { Typography } from "@material-ui/core";

export default function FreeSolo() {
  return (
    <div className="search-div pure-u-11-12 pure-u-md-1-2 pure-g">
      <Typography variant="h6">Search by your county name</Typography>
      <div className="search-input pure-u-1 pure-u-md-2-3">
        <div style={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={counties.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="County Name"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

const counties = [{ name: "Orange County" }, { name: "Foryth County" }];
