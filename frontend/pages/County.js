import React from "react";
import SexGraph from '../components/SexGraph'

export default function County(props) {
    return (
        <div>
            <h1>County = {props.location.state.county}</h1>
            <p>All Detainees = {props.location.state.all.toString()}</p>
            <p>Pretrial Detainees = {props.location.state.pretrial.toString()}</p>
            <SexGraph/>
        </div>
    )
}