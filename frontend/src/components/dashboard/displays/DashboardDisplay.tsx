import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ID } from "../../../queries";
import { Link, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));
function DashboardDisplay({ show }: { show: boolean }) {
  const classes = useStyles();
  const getId = useQuery(GET_ID) as { data: { me: { id: string } } };
  const link = getId.data
    ? `${window.location.origin}/display/${getId.data.me.id}`
    : "";
  if (!show) return null;
  return (
    <Container className={classes.root}>
      <Link href={link} target="blank">
        <Typography component="p" variant="h6">
          Click here for your website
        </Typography>
      </Link>
    </Container>
  );
}
export default DashboardDisplay;
