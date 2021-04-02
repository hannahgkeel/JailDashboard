import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Choose from './pages/Choose';
import County from './pages/County';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Domain } from "@material-ui/icons";
import { createBrowserHistory } from 'history';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      ' Open Sans',
      'sans-serif'
    ].join(','),
    button: {
      textTransform: "none"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
    <div className="app">
          <div className="pure-g main">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/choose" component={Choose}/>
              <Route path="/county" render={(props) => <County {...props}/>}/>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
