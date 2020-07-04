import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../queries";
import Menu from "./Menu";
import {
  AppBar,
  Typography,
  Container,
  Button,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  appbar: {
    padding: theme.spacing(1),
    background: "white",
  },
  spacer: theme.mixins.toolbar,
  container: {
    padding: theme.spacing(4),
  },
  restaurantName: {
    flexGrow: 1,
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(0, 2),
  },
}));
type propType = {
  match: {
    params: {
      repo: string;
    };
  };
};
type dataType = {
  email: string;
  restaurantName: string;
  address?: string;
  phone?: string;
  categories: {
    name: string;
    desc: string;
    id: string;
    items: {
      name: string;
      description: string;
      cost: number;
      imgUrl: string;
      id: string;
    }[];
  }[];
  facebook?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
};
const FrontPage = (props: propType) => {
  const user = useQuery(GET_USER, {
    variables: { id: props.match.params.repo },
  });
  const [data, setData] = React.useState<null | dataType>(null);
  React.useEffect(() => {
    if (!user.loading && user.data) {
      let data = (user.data as { getUser: dataType }).getUser;
      if (data.facebook && !data.facebook?.match(/^http(s)?:/))
        data.facebook = "https://" + data.facebook;
      if (data.youtube && !data.youtube?.match(/^http(s)?:/))
        data.youtube = "https://" + data.youtube;
      if (data.instagram && !data.instagram?.match(/^http(s)?:/))
        data.instagram = "https://" + data.instagram;
      if (data.twitter && !data.twitter?.match(/^http(s)?:/))
        data.twitter = "https://" + data.twitter;
      setData(data);
    }
  }, [user]);

  const classes = useStyles();
  const [open, setOpen] = React.useState("Menu");

  if (!data) return <div></div>;
  return (
    <div>
      <AppBar className={classes.appbar} position="absolute">
        <Toolbar>
          <Button
            onClick={() => setOpen("Menu")}
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            <Typography variant="h6">Menu</Typography>
          </Button>
          <Button
            onClick={() => setOpen("Contacts")}
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            <Typography variant="h6">Contacts</Typography>
          </Button>
          <Typography
            color="primary"
            component="h1"
            variant="h2"
            className={classes.restaurantName}
          >
            {data.restaurantName}
          </Typography>
          {data && data.instagram && (
            <IconButton target="_blank" href={`${data.instagram}`}>
              <InstagramIcon />
            </IconButton>
          )}
          {data && data.twitter && (
            <IconButton target="_blank" href={`${data.twitter}`}>
              <TwitterIcon />
            </IconButton>
          )}
          {data && data.youtube && (
            <IconButton target="_blank" href={`${data.youtube}`}>
              <YouTubeIcon />
            </IconButton>
          )}
          {data && data.facebook && (
            <IconButton target="_blank" href={`${data.facebook}`}>
              <FacebookIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.spacer} />
        <Container className={classes.container} maxWidth="lg">
          {open === "Menu" && <Menu categories={data.categories} />}
        </Container>
      </main>
    </div>
  );

  // return <div>{JSON.stringify(user.loading ? null : user.data)}</div>;
};
export default FrontPage;
