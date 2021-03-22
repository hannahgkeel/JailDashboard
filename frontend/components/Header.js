import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        right: 0,
    },
  }));



export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" color="white">
        <Toolbar>
        <Typography>
        <Button color="inherit">Home</Button>
        </Typography>
        <Typography>
        <Button color="inherit">About</Button>
        </Typography>
        </Toolbar>
        </AppBar>
        </div>
    );
}