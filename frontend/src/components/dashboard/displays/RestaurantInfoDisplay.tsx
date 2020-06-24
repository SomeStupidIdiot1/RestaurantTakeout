import React from "react";
import { Container } from "@material-ui/core";
function RestaurantInfoDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <Container component="main" maxWidth="lg"></Container>;
}

export default RestaurantInfoDisplay;
