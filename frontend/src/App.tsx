import React from "react";
// import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";
import { useApolloClient } from "@apollo/react-hooks";

function App() {
  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
