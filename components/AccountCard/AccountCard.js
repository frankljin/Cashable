import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 30,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AccountCard = ({ name, total, color, text, key, id, noDetails }) => {
  const classes = useStyles();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ background: color }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          style={{ color: text }}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h3" component="h1" style={{ color: text }}>
          {formatter.format(total)}
        </Typography>
      </CardContent>
      <CardActions>
        {!noDetails && (
          <Button
            size="small"
            style={{ color: "#65ccb8" }}
            href={`accountDetails/${id}`}
          >
            Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AccountCard;
