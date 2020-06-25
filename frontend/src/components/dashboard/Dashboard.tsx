import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";

import clsx from "clsx";
import {
  CssBaseline,
  Typography,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import MainListItems from "./MainListItems";
import { GET_ME } from "../../queries";
import LoginForm from "../LoginForm";
import MenuDisplay from "./displays/MenuDisplay";
import RestaurantInfoDisplay from "./displays/RestaurantInfoDisplay";
import AddItemDisplay from "./displays/AddItemDisplay";
import DashboardDisplay from "./displays/DashboardDisplay";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  separator: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [onDisplay, setOnDisplay] = React.useState("dashboard");
  const client = useApolloClient();
  const result = useQuery(GET_ME);

  let user = null;
  if (!result.loading) user = result.data.me;

  const logout = () => {
    localStorage.clear();
    client.resetStore();
  };
  if (user)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>

            <Button variant="outlined" color="inherit" onClick={logout}>
              <Typography component="p" variant="h6" color="inherit">
                <b>logout</b>
              </Typography>
            </Button>
            <div className={classes.separator}></div>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MainListItems display={onDisplay} setOnDisplay={setOnDisplay} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <AddItemDisplay show={onDisplay === "addMenuItem"} />
          <DashboardDisplay show={onDisplay === "dashboard"} />
          <MenuDisplay show={onDisplay === "menu"} />
          <RestaurantInfoDisplay show={onDisplay === "restaurantInfo"} />
        </main>
      </div>
    );
  if (!result.loading && !user) return <LoginForm />;

  return <div></div>;
}
