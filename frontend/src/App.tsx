import React from "react";
import LoginForm from "./components/LoginForm";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
