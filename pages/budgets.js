import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Budgets.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BudgetCard from "../components/BudgetCard/BudgetCard";
import { Grid, Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const Budgets = () => {
  const { user } = useUser();
  const [value, setValue] = useState(0);
  const [add, setAdd] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar user={user} />
      {user && (
        <div className={styles.main}>
          <Grid container justify="flex-end">
            <h1 style={{ flex: 1 }}>Budgets</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAdd(!add)}
            >
              {add ? "Cancel" : "Add Budget"}
            </Button>
          </Grid>
          <p>
            Create and track budgets here - you can contribute towards your
            budgets from any of your accounts on Cashable.
          </p>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="One-Time Budgets" />
            <Tab label="Recurring Budgets" />
          </Tabs>
          <Divider />
          {value === 0 ? (
            <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
              <Grid container spacing={3}>
                {add && (
                  <Grid item xs={6}>
                    <BudgetCard name="Test Budget" spent={20} max={50} edit />
                  </Grid>
                )}
                <Grid item xs={6}>
                  <BudgetCard name="Test Budget" spent={20} max={50} />
                </Grid>
              </Grid>
            </div>
          ) : (
            <p>Currently in Development</p>
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const accountRes = await fetch(
    `http://localhost:3000/api/accountDetails?id=6126a6e6664d246df2df3a40`
  );
  const accountJson = await accountRes.json();
  const transactionRes = await fetch(
    `http://localhost:3000/api/transactions?id=6126a6e6664d246df2df3a40`
  );
  const transactionJson = await transactionRes.json();
  return {
    props: {
      account: accountJson,
      transaction: transactionJson,
    },
  };
}

export default Budgets;
