import React from "react";
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import Search from "../components/Search.js";
import "../App.css";
import "../styles/Home.css";
import { Typography } from "@material-ui/core";

class Home extends React.Component {
  render() {
    return (
      <div className="home pure-u-1">
<<<<<<< HEAD
        <Header />
=======
>>>>>>> 6e2c213a6b6798db0aa8d0fcd7b0b6a082d2a37f
        <div className="home-header pure-g">
          <h2 className="title pure-u-1">
            <Typography variant="h4" font-weight="bold" text-align="center">
              North Carolina Jail Dashboards
            </Typography>
            <Typography variant="subtitle2">
              Key metrics on local jail populations
            </Typography>
          </h2>
        </div>
        <Search />
<<<<<<< HEAD
        <Footer />
=======
>>>>>>> 6e2c213a6b6798db0aa8d0fcd7b0b6a082d2a37f
      </div>
    );
  }
}
export default Home;
