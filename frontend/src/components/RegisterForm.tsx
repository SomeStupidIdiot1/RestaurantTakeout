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
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    restaurantName: "",
    address: "",
    phone: "",
    instagram: "",
    youtube: "",
    twitter: "",
    facebook: "",
  });
  const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line

  const [confirmPassword, setConfirmPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [register] = useMutation(CREATE_USER, {
    onError: (error) => {
      const msg = error.graphQLErrors[0].message;
      if (
        msg.startsWith(
          "User validation failed: email: Error, expected `email` to be unique"
        )
      )
        setError("Email was already registered.");
      else setError(msg);
      console.log(msg);
    },
  });
  const onSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();

    register({
      variables: registerInfo,
    });
  };
  const emailHelperText =
    !registerInfo.email.match(EMAIL_REGEX) &&
    focused !== "email" &&
    registerInfo.email !== ""
      ? "This email is invalid"
      : "";
  const passwordHelperText =
    !registerInfo.password.match(PASSWORD_REGEX) &&
    focused !== "password" &&
    registerInfo.password !== ""
      ? "Must have..."
      : "";
  const confirmPasswordHelperText =
    confirmPassword !== registerInfo.password &&
    focused !== "Confirm password" &&
    confirmPassword !== ""
      ? "This does not match the password."
      : "";
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
        <form className={classes.form} onSubmit={onSubmit} noValidate>
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
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, email: target.value })
                }
                helperText={emailHelperText}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                error={!!emailHelperText && focused !== "email"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, password: target.value })
                }
                helperText={passwordHelperText}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                error={!!passwordHelperText && focused !== "password"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm password"
                type="password"
                onChange={({ target }) => setConfirmPassword(target.value)}
                helperText={confirmPasswordHelperText}
                onFocus={() => setFocused("Confirm password")}
                onBlur={() => setFocused("")}
                error={
                  !!confirmPasswordHelperText && focused !== "Confirm password"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Restaurant Name"
                onChange={({ target }) =>
                  setRegisterInfo({
                    ...registerInfo,
                    restaurantName: target.value,
                  })
                }
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
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, address: target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Phone Number"
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, phone: target.value })
                }
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
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, instagram: target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Twitter Link"
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, twitter: target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Facebook Link"
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, facebook: target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Youtube Link"
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, youtube: target.value })
                }
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
