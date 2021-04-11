import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import County from "./pages/County";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Domain } from "@material-ui/icons";
import { createBrowserHistory } from "history";

const theme = createMuiTheme({
  typography: {
    fontFamily: [" Open Sans", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={createBrowserHistory}>
        <div className="app">
          <Header />
          <div className="pure-g main">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/county" render={(props) => <County {...props} />} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
          <Footer className="footer" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
