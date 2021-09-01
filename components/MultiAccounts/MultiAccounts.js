import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Link } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
});

const columns = [
  { field: "transaction", headerName: "Transaction", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    type: "date",
  },
  {
    field: "amount",
    headerName: "Amount ($)",
    width: 150,
  },
];

const MultiAccounts = ({ transaction }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" style={{ height: 400 }} className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Additional Services
        </Typography>
        <Link color="black"><p>Create a multi-account transaction</p></Link>
        <Divider />
        <Link color="black"><p>Close an account</p></Link>
      </CardContent>
    </Card>
  );
};

export default MultiAccounts;
