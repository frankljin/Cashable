import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "transaction", headerName: "Transaction", width: 450 },
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

const Transactions = ({ transaction }) => {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={transaction.transactions}
        columns={columns}
      />
    </div>
  );
};

export default Transactions;
