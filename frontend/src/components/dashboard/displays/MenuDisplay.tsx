import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ITEMS_NOT_IN_CATEGORY } from "../../../queries";
import {
  Container,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  alert: { margin: theme.spacing(4) },
}));

function MenuDisplay({ show }: { show: boolean }) {
  const classes = useStyles();
  const [response, setResponse] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryDesc, setCategoryDesc] = React.useState("");
  let items = useQuery(GET_ITEMS_NOT_IN_CATEGORY);
  if (!items.loading) items = items.data.getItemsNotInCategory;
  const onSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    if (!categoryName) setResponse("Category name is required");
  };
  if (!show) return null;
  return (
    <Container maxWidth="lg" className={classes.root}>
      {items instanceof Array && !!items.length && (
        <Alert severity="info" variant="outlined" className={classes.alert}>
          {items instanceof Array && items.length === 1
            ? "There is 1 item that has not been added to any categories."
            : `There are ${
                items instanceof Array && items.length
              } items that have not been added to any categories.`}
        </Alert>
      )}
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={5}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Category Name"
                autoFocus
                value={categoryName}
                onChange={({ target }) => setCategoryName(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Category Description"
                value={categoryDesc}
                multiline
                onChange={({ target }) => setCategoryDesc(target.value)}
              />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add new category
            </Button>
          </Grid>
          {/* <Grid container item xs={12} lg={8}></Grid> */}
        </Grid>
      </form>
      <Snackbar
        open={!!response}
        autoHideDuration={6000}
        onClose={() => setResponse("")}
      >
        {response.startsWith("Success") ? (
          <Alert severity="success">{response}</Alert>
        ) : response !== "" ? (
          <Alert severity="error">{response}</Alert>
        ) : (
          <div></div>
        )}
      </Snackbar>
    </Container>
  );
}

export default MenuDisplay;
