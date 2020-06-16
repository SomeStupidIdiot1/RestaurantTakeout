import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../mutations";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [register] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      // setError(error.graphQLErrors[0].message);
    },
  });
  const onSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    register({
      variables: {
        email,
        password,
        restaurantName,
        address,
        phone,
        facebook,
        youtube,
        instagram,
        twitter,
      },
    });
  };
  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    // Needs some validation here
    setPassword(value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography component="h2" variant="subtitle1">
                Account Information (required)
              </Typography>

              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoFocus
                type="email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Restaurant Name"
                onChange={({ target }) => setRestaurantName(target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <br />
              <Typography component="h2" variant="subtitle1">
                Contact Information
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                label="Restaurant Address"
                onChange={({ target }) => setAddress(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Phone Number"
                onChange={({ target }) => setPhone(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <br />
              <Typography component="h2" variant="subtitle1">
                Social Media
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                label="Instagram Link"
                onChange={({ target }) => setInstagram(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Twitter Link"
                onChange={({ target }) => setTwitter(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Facebook Link"
                onChange={({ target }) => setFacebook(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Youtube Link"
                onChange={({ target }) => setYoutube(target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
