import React from "react";
// import RegisterForm from "./components/RegisterForm";
// import LoginForm from "./components/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";

function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
