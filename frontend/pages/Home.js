import React from "react";
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import Search from '../components/Search.js';
import "../App.css";
import "../styles/Home.css";
import { Typography } from "@material-ui/core";



class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="home-header pure-g">
                    <h2>
                        <Typography variant="h6">Search by your county name</Typography>
                        <Search />
                        </h2>
                </div>
                <Footer />
            </div>
        )
    }
}
export default Home;