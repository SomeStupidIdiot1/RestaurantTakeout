import React, { useState } from "react";
import {
  TextField,
  Grid,
  Container,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-top": theme.spacing(3),
  },
}));
function AddItemDisplay({ show }: { show: boolean }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [response, setResponse] = useState("");

  const classes = useStyles();
  const [focus, setFocus] = useState<string | null>(null);
  if (!show) return null;
  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!name || !cost) setResponse("Missing entries");
    else if (!parseFloat(cost)) setResponse("Please fix the entry for cost");
    else setResponse("Success");
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <form noValidate onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Item name"
              autoFocus
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Cost"
              value={cost}
              onChange={({ target }) => setCost(target.value)}
              onFocus={() => setFocus("cost")}
              onBlur={() => setFocus(null)}
              error={!focus && cost !== "" && !parseFloat(cost)}
              helperText={
                !focus && cost !== "" && !parseFloat(cost)
                  ? "this is not a number"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              variant="outlined"
              margin="normal"
              fullWidth
              label="Description"
              value={desc}
              onChange={({ target }) => setDesc(target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Add new item
        </Button>
      </form>
      <Snackbar
        open={!!response}
        autoHideDuration={6000}
        onClose={() => setResponse("")}
      >
        {response === "Success" ? (
          <Alert severity="success">Success!</Alert>
        ) : response !== "" ? (
          <Alert severity="error">{response}</Alert>
        ) : (
          <div></div>
        )}
      </Snackbar>
    </Container>
  );
}

export default AddItemDisplay;
