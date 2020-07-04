import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type propType = {
  email: string;
  address?: string;
  phone?: string;
};
const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));
const Contacts = ({ email, address, phone }: propType) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4" color="primary">
        <b>Email address:</b> {email}
      </Typography>
      {address && (
        <Typography component="h2" variant="h4" color="primary">
          <b>Restaurant location:</b> {address}
        </Typography>
      )}
      {phone && (
        <Typography component="h2" variant="h4" color="primary">
          <b>Phone number:</b> {phone}
        </Typography>
      )}
    </div>
  );
};
export default Contacts;
