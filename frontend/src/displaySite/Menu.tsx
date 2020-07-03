import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent, Grid, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 150,
  },
  title: { textAlign: "center", display: "block" },
  desc: { textAlign: "center" },
  content: {
    width: "100%",
  },
}));
type categoryType = {
  name: string;
  desc: string;
  id: string;
  items: {
    name: string;
    description: string;
    cost: number;
    imgUrl: string;
  }[];
};
type propType = {
  categories: categoryType[];
};
const Menu = ({ categories }: propType) => {
  const classes = useStyles();
  const [category, setCategory] = React.useState<categoryType | null>(null);
  return (
    <Grid container>
      {categories.map((category) => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={category.id}>
          <Card variant="elevation" elevation={5} className={classes.root}>
            <Button
              className={classes.content}
              onClick={() => setCategory(category)}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  variant="h4"
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
  );
};
export default Menu;
