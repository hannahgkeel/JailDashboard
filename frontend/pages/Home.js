import React from "react";
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import "../App.css";
//import "./Home.css";



class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
}
export default Home;