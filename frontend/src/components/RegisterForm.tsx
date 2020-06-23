import React, { useState, useRef } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Popper,
  Snackbar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER, LOGIN } from "../mutations";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  popper: {
    border: "1px solid",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
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
  const history = useHistory();
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    restaurantName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [response, setResponse] = useState("");
  const [anchorEl, setAnchorEl]: [null | HTMLInputElement, Function] = useState(
    null
  );
  const [register] = useMutation(CREATE_USER, {
    onError: (error) => {
      if (error.graphQLErrors.length !== 0) {
        const msg = error.graphQLErrors[0].message;
        setResponse(msg);
      }
    },
  });
  const [login, result] = useMutation(LOGIN);
  React.useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("user-logged-in-token", token);
    }
  }, [result.data]);
  const passwordInputRef = useRef(null);
  const emailHelperText =
    !registerInfo.email.match(/^\S+@\S+$/) &&
      focused !== "email" &&
      registerInfo.email !== ""
      ? "This email is invalid"
      : "";
  const getPasswordHelperText = ():
    | React.ReactElement<typeof Typography>
    | string => {
    let requiredParameters: React.ReactElement<typeof Typography>[] = [];
    if (registerInfo.password.toLowerCase() === registerInfo.password)
      requiredParameters = requiredParameters.concat(
        <Typography variant="subtitle2" component="p" key="no upper case">
          Needs an uppercase letter.
        </Typography>
      );
    if (registerInfo.password.length < 8 || registerInfo.password.length > 40)
      requiredParameters = requiredParameters.concat(
        <Typography
          variant="subtitle2"
          component="p"
          key="too short or too long"
        >
          Must be between 8 to 40 characters.
        </Typography>
      );
    if (!registerInfo.password.match(/[#?!@$%^&*-]/))
      requiredParameters = requiredParameters.concat(
        <Typography variant="subtitle2" component="p" key="no symbol">
          Contains one of the following: #?!@$%^&*-
        </Typography>
      );
    if (!/\d/.test(registerInfo.password))
      requiredParameters = requiredParameters.concat(
        <Typography variant="subtitle2" component="p" key="no number">
          Needs at least 1 number.
        </Typography>
      );

    const passwordHelperText =
      requiredParameters.length !== 0 && focused === "password" ? (
        <div>{requiredParameters}</div>
      ) : (
          ""
        );
    return passwordHelperText;
  };
  const confirmPasswordHelperText =
    confirmPassword !== registerInfo.password &&
      focused !== "Confirm password" &&
      confirmPassword !== ""
      ? "This does not match the password."
      : "";
  const onSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    if (emailHelperText || !registerInfo.email) setResponse("Invalid email");
    else if (
      !registerInfo.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/
      )
    )
      setResponse("Invalid password");
    else if (registerInfo.password !== confirmPassword)
      setResponse("Confirmation password does not match");
    else if (!registerInfo.restaurantName)
      setResponse("Needs a restaurant name");
    else
      register({
        variables: registerInfo,
      }).then((res) => {
        if (res) {
          setResponse("Success");
          login({
            variables: {
              email: registerInfo.email,
              password: registerInfo.password,
            },
          }).then((res) => {
            if (res) {
              setTimeout(() => {
                history.push("/dashboard");
                window.location.reload();
              }, 1000);
            }
          });
        }
        setRegisterInfo({
          email: "",
          password: "",
          restaurantName: "",
        });
        setConfirmPassword("");
      });
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
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography component="h2" variant="subtitle1">
                Account Information
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoFocus
                type="email"
                value={registerInfo.email}
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, email: target.value })
                }
                helperText={emailHelperText}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                error={!!emailHelperText && focused !== "email"}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={registerInfo.password}
                id=""
                onChange={({ target }) =>
                  setRegisterInfo({ ...registerInfo, password: target.value })
                }
                onFocus={() => {
                  setFocused("password");
                  setAnchorEl(passwordInputRef.current);
                }}
                onBlur={() => {
                  setFocused("");
                  setAnchorEl(null);
                }}
                error={!!getPasswordHelperText() && focused !== "password"}
                ref={passwordInputRef}
              />
            </Grid>
            <Popper
              open={!!anchorEl && !!getPasswordHelperText()}
              anchorEl={anchorEl}
              placement="left"
              className={classes.popper}
            >
              {getPasswordHelperText()}
            </Popper>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm password"
                value={confirmPassword}
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
                value={registerInfo.restaurantName}
                onChange={({ target }) =>
                  setRegisterInfo({
                    ...registerInfo,
                    restaurantName: target.value,
                  })
                }
                onBlur={() => setFocused("")}
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
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <br />
        <br />
        <br />
      </div>
      <Snackbar
        open={!!response}
        autoHideDuration={6000}
        onClose={() => setResponse("")}
      >
        {response === "Success" ? (
          <Alert severity="success">Success!</Alert>
        ) : response !== "" ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {response}
          </Alert>
        ) : (
              <div></div>
            )}
      </Snackbar>
    </Container>
  );
}
