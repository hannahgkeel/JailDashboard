import React from "react";
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import "../App.css";
import "../styles/Home.css";
import "../styles/Search.css";
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
                <div className='search-div pure-u-11-12 pure-u-md-1-2 pure-g'>
                <Button variant="contained" size="large" color="primary">
                All Detainees
                </Button>
                <Button variant="contained" size="large" color="primary">
                Pretrial Detainees
                </Button>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Choose;