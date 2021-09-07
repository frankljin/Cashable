import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../../components/Navbar/Navbar";
import Paper from "@material-ui/core/Paper";
import Transactions from "../../components/Transactions/Transactions";
import Button from "@material-ui/core/Button";
import TransactionModal from "../../components/TransactionModal/TransactionModal";
import { Grid } from "@material-ui/core";
import styles from "../../styles/accountDetails.module.css";

const Details = ({ account, transaction }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  useEffect(() => {
    const getAccounts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/budgets?id=${user.sub}`
      );
      const json = await res.json();
      setBudgets(json);
      console.log(json);
    };
    if (user) {
      getAccounts();
    }
  }, [user]);
  return (
    <>
      <Navbar user={user} />
      <div className={styles.main}>
        <Grid container justify="flex-end" style={{ marginBottom: "2rem" }}>
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
          <TransactionModal
            open={open}
            handleClose={handleClose}
            id={account._id}
            accountTotal={account.total}
            budgets={budgets}
          />
        </Grid>
        <Paper className={styles.total}>
          <Grid container justify="flex-end">
            <h1 style={{ flex: 1 }}>
              <span className={styles.accountName}>Balance: </span>
              {formatter.format(account.total)}
            </h1>
          </Grid>
        </Paper>
        <Transactions transaction={transaction} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
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
