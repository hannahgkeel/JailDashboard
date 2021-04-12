import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";
import "../App.css";
import "../styles/Home.css";
import { Typography } from "@material-ui/core";

export default function County(props) {
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
      <SexGraph />
      <RaceGraph />
      <DetentionTypeGraph />
      <AgeGraph />
    </div>
  );
}
