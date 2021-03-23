import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
      toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        alignSelf: 'center',
      },
  }));


export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} variant="h4" align="center">
                        North Carolina Jail Dashboards
                    </Typography>
                    {/* <Typography variant="subtitle1">
                        Key metrics on local jail populations
                    </Typography> */}
                    {/* <Typography align="left">
                        Criminal Justice Innovation Lab
                    </Typography> */}
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