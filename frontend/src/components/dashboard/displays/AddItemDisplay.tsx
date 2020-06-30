import React, { useState } from "react";
import {
  TextField,
  Grid,
  Container,
  Button,
  Input,
  Snackbar,
  FormLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ITEM } from "../../../mutations";
import { GET_ITEMS, GET_ITEMS_NOT_IN_CATEGORY } from "../../../queries";
import ItemTable from "./ItemTable";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  topTextField: {
    marginTop: 0,
  },
  input: {
    margin: theme.spacing(1, 0),
  },
}));
function AddItemDisplay({ show }: { show: boolean }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [response, setResponse] = useState("");
  const classes = useStyles();
  const [focus, setFocus] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [addItem] = useMutation(ADD_ITEM, {
    update: (store, response) => {
      type dataType = {
        getItems: unknown[];
      };
      const dataInStore = store.readQuery<dataType>({
        query: GET_ITEMS,
      });
      let items = [response.data.addItem];
      if (dataInStore) items = items.concat(dataInStore.getItems);

      store.writeQuery({
        query: GET_ITEMS,
        data: {
          getItems: items,
        },
      });
    },
    onError: (error) => {
      if (error.graphQLErrors.length) {
        const msg = error.graphQLErrors[0].message;
        setResponse(msg);
        console.log(msg);
      }
    },
    refetchQueries: [{ query: GET_ITEMS_NOT_IN_CATEGORY }],
  });

  if (!show) return null;
  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!name || !cost) setResponse("Missing entries");
    else if (!parseFloat(cost)) setResponse("Please fix the entry for cost");
    else {
      setResponse("Successfully added an item");
      addItem({
        variables: { name, cost: parseFloat(cost), description: desc },
      });
      setName("");
      setCost("");
      setDesc("");
    }
  };
  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={5} alignItems="flex-start">
          <Grid container item xs={12} lg={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Item name"
                autoFocus
                value={name}
                className={classes.topTextField}
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
            <FormLabel className={classes.input} htmlFor="file-upload">
              {"Upload image (not required) "}
              <Input
                name="file"
                type="file"
                id="file-upload"
                data-cloudinary-field="image_id"
                data-form-data="{ 'transformation': {'crop':'scale','width':200,'height':200}}"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file: File = (target.files as FileList)[0];
                  setFile(file);
                }}
                disableUnderline
              />
            </FormLabel>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Add new item
            </Button>
          </Grid>
          <Grid container item xs={12} lg={8}>
            <Grid item xs>
              <ItemTable setResponse={setResponse} />
            </Grid>
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

export default AddItemDisplay;
