import React, { useState, useEffect } from "react";
import axios from "axios";
import AllDetaineesGrid from "../components/AllDetaineesGrid";
import PretrialDetaineesGrid from "../components/PretrialDetaineesGrid";
import "../styles/Home.css";
import "../styles/County.css";
import { Typography } from "@material-ui/core";

export default function County(props) {
  let isAllDetainees = props.location.state.all;

  useEffect(() => {
    let countyId = props.location.state.county.county_id;
    console.log(countyId);
    axios.get(`/county/${countyId}`).then((res) => {
      console.log("County:" + res.data);
      setData(res.data);
    });
  }, [data]);

  const [data, setData] = useState([]);

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
      {isAllDetainees ? (
        <AllDetaineesGrid data={data} />
      ) : (
        <PretrialDetaineesGrid data={data} />
      )}
    </div>
  );
}
