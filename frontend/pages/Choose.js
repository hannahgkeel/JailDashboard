import React from "react";
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import "../App.css";
import "../styles/Home.css";
import { Typography, Button } from "@material-ui/core";

class Choose extends React.Component {
    render() {
        return (
            <div className="home pure-u-1">
                <Header />
                <div className="home-header pure-g">
                    <h2 className='title pure-u-1'>
                        <Typography variant="h4" font-weight="bold" text-align="center">Orange County</Typography>
                        </h2>
                </div>
                <Button variant="contained" color="primary">
                All Detainees
                </Button>
                <Footer />
            </div>
        )
    }
}
export default Choose;