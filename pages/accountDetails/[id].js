import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../../components/Navbar/Navbar";
import Transactions from "../../components/Transactions/Transactions";
import Button from "@material-ui/core/Button";
import TransactionModal from "../../components/TransactionModal/TransactionModal";
import { Grid } from "@material-ui/core";
import styles from "../../styles/accountDetails.module.css";

const Details = ({ account, transaction }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
}
  return (
    <>
      <Navbar user={user} />
      <div className={styles.main}>
        <Grid container justify="flex-end" style={{marginBottom: "2rem"}}>
          <h1 style={{ flex: 1 }}>
            <span className={styles.accountName}>{account.name}</span> Account
            Details
          </h1>
          <Button
            variant="contained"
            style={{ background: "#65CCB8" }}
            onClick={handleOpen}
          >
            Add Transaction
          </Button>
          <TransactionModal open={open} handleClose={handleClose} id={account._id} />
        </Grid>
        <Transactions transaction={transaction} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);
  const accountRes = await fetch(
    `http://localhost:3000/api/accountDetails?id=${id}`
  );
  const accountJson = await accountRes.json();
  const transactionRes = await fetch(
    `http://localhost:3000/api/transactions?id=${id}`
  );
  const transactionJson = await transactionRes.json();
  return {
    props: {
      account: accountJson,
      transaction: transactionJson,
    },
  };
}

export default Details;
