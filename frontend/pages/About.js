import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Home.css";
import "../styles/About.css";
import { Typography } from "@material-ui/core";

class About extends React.Component {
    render() {
        return (
            <div className="home pure-u-1">
                <Header />
                <div className="home-header pure-g">
                    <h2 className='title pure-u-1'>
                        <Typography variant="h4" font-weight="bold" text-align="center">About Us</Typography>
                        <Typography variant="subtitle2">Key metrics on local jail populations</Typography>
                        </h2>
                </div>
                <div className="about-text">
                    <Typography variant="subtitle2">
                    <h3>What are the North Carolina Jail Dashboards?</h3>
                    <p>
                    The Dashboards provide county-level information about local jail populations,
                     including for example, how many people are detained in jail, the reason for
                      their detention, and the demographic profile of detainees.
                    </p>

                    <h3>Why were the Dashboards developed?</h3>
                    <p>
                    Citizens and criminal justice system stakeholders wanted an easy to use
                     tool to understand things like: how many people are incarcerated local jails,
                      who they are, and why they are being held. The Dashboards provide that data.
                    </p>
                    <h3>Who created the Dashboards?</h3>
                    <p>
                    In 2021, the Lab teamed up with a group of UNC computer science
                     students to create the Dashboards. The student team included:
                      Hannah Keel, Jose Aguayo, Julian Osorio, Paul Jones.
                    </p>
                    <h3>Where does the data for the Dashboards come from?</h3>
                    <p>
                    Local jails submit data to the Lab. Lab staff then organize the data, put it in a
                     standard format for uploading, and upload it to the Dashboards. The Lab does not
                      “audit” or otherwise verify data submitted by the jails.
                    </p>
                    <h3>How current is the data?</h3>
                    <p>
                    It varies by jail. Each Dashboard lists the date of the last data upload.
                    </p>
                    <h3>What if I have questions about the Dashboards?</h3>
                    <p>
                    <a href="https://cjil.sog.unc.edu/contact-us/">Click here</a> to connect with us on the web.
                    </p>
                    </Typography>
                    </div>
                <Footer />
            </div>
        );
    }
}

export default About;