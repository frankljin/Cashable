import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  { field: "transaction", headerName: "Transaction", width: 500 },
  {
    field: "type",
    headerName: "Type",
    width: 300,
  },
  {
    field: "date",
    headerName: "Date",
    width: 300,
    type: "date",
  },
  {
    field: "amount",
    headerName: "Amount ($)",
    width: 300,
  },
];

const useStyles = makeStyles({
  root: {
    '& .pos': {
      backgroundColor: '#b9d5ff91',
      color: '#1a3e72',
    },
    '& .neg': {
      backgroundColor: '#ff943975',
      color: '#1a3e72',
    },
  },
});

const Transactions = ({ transaction }) => {
  const classes = useStyles();
  return (
    <div style={{ height: 400, width: "100%" }} className={classes.root}>
      <DataGrid
        rows={transaction.transactions}
        columns={columns}
        getCellClassName={(params) => {
          if (params.field === "type" || params.field === "data") {
            return "";
          }
          return params.value > 0 ? "pos" : "neg";
        }}
      />
    </div>
  );
};

export default Transactions;
