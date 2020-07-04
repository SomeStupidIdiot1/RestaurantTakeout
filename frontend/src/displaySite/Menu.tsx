import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  title: { textAlign: "center", display: "block" },
  desc: { textAlign: "center" },
  content: {
    width: "100%",
  },
  menuTitle: {
    padding: theme.spacing(3, 0),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  img: {
    maxHeight: 400,
    width: "100%",
  },
}));
type itemType = {
  name: string;
  description: string;
  cost: number;
  imgUrl: string;
  id: string;
};
type categoryType = {
  name: string;
  desc: string;
  id: string;
  items: itemType[];
};
type propType = {
  categories: categoryType[];
};
const Menu = ({ categories }: propType) => {
  const classes = useStyles();
  const [items, setItems] = React.useState<itemType[] | null>(null);
  return (
    <>
      <Typography component="h1" variant="h2" className={classes.menuTitle}>
        Menu
      </Typography>

      {!items && (
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={category.id}>
              <Card variant="elevation" elevation={5} className={classes.root}>
                <Button
                  className={classes.content}
                  onClick={() => setItems(category.items)}
                >
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      variant="h6"
                      component="h2"
                    >
                      {category.name.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="p"
                      className={classes.desc}
                    >
                      {category.desc}
                    </Typography>
                  </CardContent>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!!items && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setItems(null)}
            className={classes.button}
          >
            <Typography component="p" variant="button">
              Go back
            </Typography>
          </Button>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  variant="elevation"
                  elevation={5}
                  className={classes.root}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className={classes.img}
                  />
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      variant="h6"
                      component="h2"
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="p"
                      className={classes.desc}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
export default Menu;
