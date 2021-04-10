import React from "react";
import Container from '@material-ui/core/Container';
import { Typography } from "@material-ui/core";

import '../styles/Footer.css'

export default function Footer() {
    return (
        <Container className="Footer-container">
            <Typography>© 2021 COMP523 - Team A</Typography>
        </Container>
    );
}