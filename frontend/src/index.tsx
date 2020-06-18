import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const token = localStorage.getItem("user-logged-in-token");

const client = new ApolloClient({
  uri: "http://localhost:4000",
  headers: {
    authorization: token ? `bearer ${token}` : null,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
