import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ContactsIcon from "@material-ui/icons/Contacts";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import List from "@material-ui/core/List";
const MainListItems = ({
  setOnDisplay,
}: {
  setOnDisplay: (display: string) => void;
}) => {
  return (
    <List>
      <ListItem button onClick={() => setOnDisplay("dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText
          primary="Restaurant Info"
          onClick={() => setOnDisplay("restaurantInfo")}
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Menu" onClick={() => setOnDisplay("menu")} />
      </ListItem>
      <ListItem button>
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
