import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/Navbar/Navbar";
import AccountCard from "../components/AccountCard/AccountCard";
import Button from "@material-ui/core/Button";
import AccountModal from "../components/AccountModal/AccountModal";
import { Grid } from "@material-ui/core";
import styles from "../styles/Accounts.module.css";

const Accounts = () => {
  const { user, error, isLoading } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getAccounts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/accounts?id=${user.sub}`
      );
      const json = await res.json();
      setAccounts(json);
      console.log(json);
    };
    if (user) {
      getAccounts();
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      {user && (
        <div className={styles.main}>
          <Grid container justify="flex-end">
            <h1 style={{ flex: 1 }}>Accounts</h1>
            <Button
              variant="contained"
              style={{ background: "#65CCB8" }}
              onClick={handleOpen}
            >
              Add Account
            </Button>
            <AccountModal
              open={open}
              handleClose={handleClose}
              sub={user.sub}
            />
          </Grid>
          {accounts.length === 0 ? (
            <p>
              You currently have no active accounts on Cashable. Add your first
              account using the button to the right.
            </p>
          ) : (
            <>
              <p>
                This is where you&apos;ll find transaction details about your
                individual accounts active on Cashable, as well as overall
                transaction details for all active accounts.
              </p>
              <AccountCard
                name={"Total"}
                total={accounts.reduce((a, b) => a + b.total, 0)}
                key={0}
                color="#182628"
                text="white"
              />
              {accounts.map((account) => {
                return (
                  <AccountCard
                    name={account.name}
                    total={account.total}
                    key={account._id}
                    id={account._id}
                    color="white"
                    text="black"
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Accounts;
