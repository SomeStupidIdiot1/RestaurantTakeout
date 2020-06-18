import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";

function App() {
  const [token, setToken] = React.useState(
    localStorage.getItem("user-logged-in-token")
  );
  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
