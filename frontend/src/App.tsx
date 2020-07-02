import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";
import FrontPage from "./displaySite/FrontPage";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/display/:repo" component={FrontPage} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
