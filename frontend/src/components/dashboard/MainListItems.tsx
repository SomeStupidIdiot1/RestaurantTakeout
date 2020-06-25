import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ContactsIcon from "@material-ui/icons/Contacts";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selected: {
    background: theme.palette.grey[300],
  },
  notSelected: {
    background: "white",
  },
}));
const MainListItems = ({
  setOnDisplay,
  display,
}: {
  setOnDisplay: (display: string) => void;
  display: string;
}) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem
        button
        onClick={() => setOnDisplay("dashboard")}
        className={
          display === "dashboard" ? classes.selected : classes.notSelected
        }
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        className={
          display === "restaurantInfo" ? classes.selected : classes.notSelected
        }
      >
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText
          primary="Restaurant Info"
          onClick={() => setOnDisplay("restaurantInfo")}
        />
      </ListItem>
      <ListItem
        button
        className={display === "menu" ? classes.selected : classes.notSelected}
      >
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Menu" onClick={() => setOnDisplay("menu")} />
      </ListItem>
      <ListItem
        button
        className={
          display === "addMenuItem" ? classes.selected : classes.notSelected
        }
      >
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText
          primary="Add Menu Item"
          onClick={() => setOnDisplay("addMenuItem")}
        />
      </ListItem>
    </List>
  );
};
export default MainListItems;
