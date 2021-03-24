import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Home.css";
import "../styles/About.css";
import { Typography } from "@material-ui/core";

class About extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="home-header pure-g">
                    <h2>
                        <Typography variant="h6">About Us</Typography>
                    </h2>
                {/* <Typography>
                    What are the North Carolina Jail Dashboards?
                </Typography>
                <Typography>
                    Why were the Dashboards developed?
                </Typography>
                <Typography>
                    Who created the Dashboards?
                </Typography>
                <Typography>
                    Where does the data for the Dashboards come from?
                </Typography>
                <Typography>
                    How current is te data?
                </Typography>
                <Typography>
                    What if I have questions about the Dashboards?
                </Typography> */}
                </div>
                <Footer />
            </div>
        );
    }
}

export default About;