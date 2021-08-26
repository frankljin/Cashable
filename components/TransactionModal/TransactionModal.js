import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TransactionModal = ({ open, handleClose, sub }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const url = "/api/accounts";
  const handleSubmit = async () => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, total: parseFloat(total), sub: sub }),
    });
    const status = response.status;
    if (status != 200) {
      console.log(status);
      window.alert("Something went wrong. Please try again.")
    } else {
      console.log("successfully added new account.")
      handleClose();
      location.reload();
    }
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
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <h1>Add an transaction</h1>
        <p>
          Please provide the following details of your transaction:
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

export default TransactionModal;
