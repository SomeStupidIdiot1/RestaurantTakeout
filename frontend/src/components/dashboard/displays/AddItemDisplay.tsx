import React, { useState } from "react";
import {
  TextField,
  Grid,
  Container,
  Button,
  Snackbar,
  FormLabel,
} from "@material-ui/core";
import { FilePond, registerPlugin, File } from "react-filepond";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ITEM } from "../../../mutations";
import { GET_ITEMS, GET_ITEMS_NOT_IN_CATEGORY } from "../../../queries";
import ItemTable from "./ItemTable";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
// @ts-ignore
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  firstItem: {
    marginTop: 0,
  },
  lastItem: {
    marginTop: theme.spacing(2),
  },
  desc: {
    marginBottom: theme.spacing(2),
  },
}));
function AddItemDisplay({ show }: { show: boolean }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [response, setResponse] = useState("");
  const classes = useStyles();
  const [focus, setFocus] = useState<string | null>(null);
  const [file, setFile] = useState<File[]>([]);
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
        variables: {
          name,
          cost: parseFloat(cost),
          description: desc,
          imgStringBase64:
            // @ts-ignore
            file.length && file[0] ? file[0].getFileEncodeBase64String() : "",
        },
      });
      setName("");
      setCost("");
      setDesc("");
      setFile([]);
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
                className={classes.firstItem}
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
                className={classes.desc}
                onChange={({ target }) => setDesc(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel htmlFor="file-upload">
                {"Upload image (not required) "}
              </FormLabel>
              <FilePond
                files={file}
                // @ts-ignore
                imagePreviewHeight={300}
                imageResizeTargetHeight={300}
                imagePreviewMaxFileSize="2MB"
                imageResizeMode="cover"
                acceptedFileTypes={["image/*"]}
                allowMultiple={false}
                getFileEncodeBase64String
                onupdatefiles={(fileItems) => {
                  if (fileItems.length && fileItems[0]) {
                    console.log(fileItems);
                    setFile(fileItems);
                  }
                }}
              />
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFile([]);
                }}
                size="small"
              >
                Reset upload file
              </Button>
            </Grid>
            <Button
              className={classes.lastItem}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
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
