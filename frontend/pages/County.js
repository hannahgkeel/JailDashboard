import React from "react";
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

export default function County(props) {
    return (
        <div>
            <h1>County = {props.location.state.county}</h1>
            <p>All Detainees = {props.location.state.all.toString()}</p>
            <p>Pretrial Detainees = {props.location.state.pretrial.toString()}</p>
        </div>

    )
}