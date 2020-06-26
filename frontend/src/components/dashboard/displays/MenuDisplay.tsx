import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ITEMS_NOT_IN_CATEGORY, GET_CATEGORIES } from "../../../queries";
import { ADD_CATEGORY } from "../../../mutations";
import {
  Container,
  Grid,
  TextField,
  Button,
  Snackbar,
  MenuItem,
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
  currCategory: {
    width: 300,
    borderRadius: 4,
  },
}));

function MenuDisplay({ show }: { show: boolean }) {
  const classes = useStyles();
  const [response, setResponse] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryDesc, setCategoryDesc] = React.useState("");
  const [currCategory, setCurrCategory] = React.useState("");
  let items = useQuery(GET_ITEMS_NOT_IN_CATEGORY);
  let categories = useQuery(GET_CATEGORIES);
  let [addCategory] = useMutation(ADD_CATEGORY, {
    onError: (error) => {
      if (error.graphQLErrors.length)
        setResponse(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  let menuItems: React.ReactElement[] = [];
  if (!items.loading) items = items.data.getItemsNotInCategory;
  if (!categories.loading) {
    categories = categories.data.getCategories;
    if (categories instanceof Array)
      menuItems = categories.map(({ id, name }) => {
        return (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        );
      });
  }
  const onSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    if (!categoryName) setResponse("Category name is required");
    else {
      setCategoryDesc("");
      setCategoryName("");
      addCategory({
        variables: { name: categoryName, desc: categoryDesc },
      }).then((res) => {
        if (res) setResponse("Successfully added a new category");
      });
      setResponse("Successfully added a new category");
    }
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
          <Grid container item xs={12} lg={8}>
            <TextField
              label="Select category"
              select
              value={currCategory}
              className={classes.currCategory}
              onChange={(event) => setCurrCategory(event.target.value)}
              variant="filled"
              margin="normal"
            >
              {menuItems}
            </TextField>
          </Grid>
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
