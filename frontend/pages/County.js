import React from "react";
import SexGraph from "../components/SexGraph";
import RaceGraph from "../components/RaceGraph";
import DetentionTypeGraph from "../components/DetentionTypeGraph";
import AgeGraph from "../components/AgeGraph";

export default function County(props) {
  return (
    <div>
      <h1>County = {props.location.state.county}</h1>
      <p>All Detainees = {props.location.state.all.toString()}</p>
      <p>Pretrial Detainees = {props.location.state.pretrial.toString()}</p>
      <SexGraph />
      <RaceGraph />
      <DetentionTypeGraph />
      <AgeGraph />
    </div>
  );
}
