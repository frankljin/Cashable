import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const AccountModal = ({ open, handleClose, sub }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const accountUrl = "/api/accounts";
  const handleSubmit = async () => {
    const accountResponse = await fetch(accountUrl, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, total: parseFloat(total), sub: sub }),
    });
    const accountStatus = accountResponse.status;
    if (accountStatus != 200) {
      console.log(status);
      window.alert("Something went wrong. Please try again.");
    } else {
      console.log("successfully added new account.");
    }
    accountResponse.json().then(async (json) => {
      const accountId = json.insertedId;
      const transUrl = "/api/transactions";
      const transResponse = await fetch(transUrl, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account: accountId, transactions: [] }),
      });
      const transStatus = transResponse.status;
      if (transStatus != 200) {
        console.log(status);
        window.alert("Something went wrong. Please try again.");
      } else {
        console.log("successfully added to transaction collection.");
        handleClose();
        location.reload();
      }
    });
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 500,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <h1>Add an account</h1>
        <p>
          To add a new account to Cashable, please provide these following
          details:
        </p>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            required
            style={{ width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            id="filled-basic"
            label="Balance"
            type="number"
            variant="filled"
            required
            style={{ width: "100%" }}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          style={{ background: "#65CCB8" }}
          onClick={() => handleSubmit()}
        >
          Add Account
        </Button>
      </div>
    </Modal>
  );
};

export default AccountModal;
