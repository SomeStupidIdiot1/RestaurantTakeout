import React from "react";
import {
  Container,
  Grid,
  TextField,
  Snackbar,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { EDIT_USER_CONTACT } from "../../../mutations";
import { GET_ME } from "../../../queries";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-top": theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

function RestaurantInfoDisplay({ show }: { show: boolean }) {
  const classes = useStyles();
  const initialInfo = useQuery(GET_ME);
  const [editUserContact] = useMutation(EDIT_USER_CONTACT);
  const [instagram, setInsta] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    if (!initialInfo.loading) {
      const {
        address,
        phone,
        facebook,
        youtube,
        instagram,
        twitter,
      } = initialInfo.data.me;

      setInsta(instagram);
      setYoutube(youtube);
      setTwitter(twitter);
      setFacebook(facebook);
      setPhone(phone);
      setAddress(address);
    }
  }, [initialInfo]);
  const onSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    editUserContact({
      variables: {
        address,
        phone,
        facebook,
        youtube,
        instagram,
        twitter,
      },
    }).then((res) => {
      if (res) setResponse("Success");
    });
  };

  if (!show) return null;
  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Instagram Link"
              autoFocus
              value={instagram}
              onChange={({ target }) => setInsta(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Twitter Link"
              value={twitter}
              onChange={({ target }) => setTwitter(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Facebook Link"
              value={facebook}
              onChange={({ target }) => setFacebook(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Youtube Link"
              value={youtube}
              onChange={({ target }) => setYoutube(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Restaurant Address"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Restaurant Phone Number"
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Save
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

export default RestaurantInfoDisplay;
