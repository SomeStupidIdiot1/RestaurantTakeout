import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ITEMS_NOT_IN_CATEGORY, GET_CATEGORIES } from "../../../queries";
import {
  ADD_CATEGORY,
  ADD_ITEM_TO_CATEGORY,
  EDIT_CATEGORY,
} from "../../../mutations";
import {
  Container,
  Grid,
  TextField,
  Button,
  Input,
  Snackbar,
  Chip,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  alert: { margin: theme.spacing(4) },
  chip: {
    background: theme.palette.grey[100],
    minHeight: 100,
    marginBottom: 10,
  },
  select: {
    width: 150,
  },
  label: {
    margin: theme.spacing(2, 0, 0),
    color: theme.palette.grey[700],
  },
}));

function MenuDisplay({ show }: { show: boolean }) {
  const classes = useStyles();
  const [response, setResponse] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryDesc, setCategoryDesc] = React.useState("");

  const [currCategory, setCurrCategory] = React.useState("");
  const [editedCategoryName, editCategoryName] = React.useState("");
  const [editedCategoryDesc, editCategoryDesc] = React.useState("");
  const [selectedItems, changeSelectedItems] = React.useState<string[]>([]);

  let items = useQuery(GET_ITEMS_NOT_IN_CATEGORY);
  let categories = useQuery(GET_CATEGORIES);
  let [addCategory] = useMutation(ADD_CATEGORY, {
    onError: (error) => {
      if (error.graphQLErrors.length)
        setResponse(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  let [editCategory] = useMutation(EDIT_CATEGORY, {
    onError: (error) => {
      if (error.graphQLErrors.length)
        setResponse(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  let [addItemsToCategory] = useMutation(ADD_ITEM_TO_CATEGORY, {
    onError: (error) => {
      if (error.graphQLErrors.length)
        setResponse(error.graphQLErrors[0].message);
    },
    refetchQueries: [
      { query: GET_ITEMS_NOT_IN_CATEGORY },
      { query: GET_CATEGORIES },
    ],
  });
  let menuItems: React.ReactElement[] = [];
  let chips: React.ReactElement[] = [];
  let itemsNotInCategories: React.ReactElement[] = [];

  if (!items.loading) {
    items = items.data.getItemsNotInCategory;
    if (items instanceof Array) {
      console.log(items);
      itemsNotInCategories = items.map(({ name, id }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ));
    }
  }
  if (!categories.loading) {
    categories = categories.data.getCategories;
    if (categories instanceof Array) {
      type ItemType = {
        name: string;
        id: string;
      };
      type CategoryType = {
        items: Array<ItemType>;
      };
      menuItems = categories.map(({ id, name }) => {
        return (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        );
      });
      const currCategoryObject: CategoryType = categories.find(
        ({ id }) => id === currCategory
      );
      if (currCategoryObject && currCategoryObject.items) {
        chips = currCategoryObject.items.map((item) => (
          <Chip
            size="medium"
            label={
              item.name.length <= 20
                ? item.name
                : item.name.substring(0, 20) + "..."
            }
            key={item.id}
            // onDelete={handleDelete}
          />
        ));
      }
    }
  }

  const onSubmitNewCategory = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    if (!categoryName) setResponse("Category name is required");
    else {
      addCategory({
        variables: { name: categoryName, desc: categoryDesc },
      }).then((res) => {
        if (res) setResponse("Successfully added a new category");
      });
      setCategoryDesc("");
      setCategoryName("");
    }
  };
  const onSubmitEditCategory = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    if (!currCategory) {
      setResponse("Select a category to edit");
      return;
    }
    if (editedCategoryName || editedCategoryDesc) {
      editCategory({
        variables: {
          id: currCategory,
          name: editedCategoryName,
          desc: editedCategoryDesc,
        },
      }).then((res) => {
        if (res) setResponse("Successfully edited the category");
      });
      editCategoryDesc("");
      editCategoryName("");
    }
    if (selectedItems.length) {
      addItemsToCategory({
        variables: { id: currCategory, itemId: selectedItems },
      }).then((res) => {
        if (res) setResponse("Successfully edited the category");
      });
      changeSelectedItems([]);
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
      <Grid container spacing={3}>
        <Grid item xs={12} md>
          <form noValidate onSubmit={onSubmitNewCategory}>
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Category Description"
              value={categoryDesc}
              multiline
              onChange={({ target }) => setCategoryDesc(target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add new category
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md>
          <form noValidate onSubmit={onSubmitEditCategory}>
            <TextField
              label="Select category"
              select
              fullWidth
              value={currCategory}
              onChange={(event) => setCurrCategory(event.target.value)}
              variant="filled"
              margin="normal"
            >
              {menuItems}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Category Name"
              value={editedCategoryName}
              onChange={({ target }) => editCategoryName(target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Category Description"
              value={editedCategoryDesc}
              multiline
              onChange={({ target }) => editCategoryDesc(target.value)}
            />
            <InputLabel id="add-items-to-category" className={classes.label}>
              Add Items
            </InputLabel>
            <Select
              labelId="add-items-to-category"
              multiple
              input={<Input />}
              className={classes.select}
              value={selectedItems}
              disabled={itemsNotInCategories.length === 0}
              onChange={(event) => {
                changeSelectedItems(event.target.value as string[]);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    width: 250,
                  },
                },
              }}
            >
              {itemsNotInCategories}
            </Select>
            <Typography
              component="h3"
              variant="subtitle1"
              className={classes.label}
            >
              Current Items
            </Typography>
            <div className={classes.chip}>{chips}</div>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Edit Category
            </Button>
          </form>
        </Grid>
      </Grid>
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
