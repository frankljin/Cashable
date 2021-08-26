import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DayPicker from "../DayPicker/DayPicker";
import TypeSelect from "../TypeSelect/TypeSelect";

const TransactionModal = ({ open, handleClose, id }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState("");
  const url = `/api/updateTransaction?account=${id.toString()}`;
  const handleSubmit = async () => {
      
    if (name === "" || total === 0 || selectedDate === null || type === "") {
      window.alert("Please fill in all required fields.");
      return;
    }
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          transaction: name,
          type,
          date: selectedDate,
          amount: total,
       }),
    });
    const status = response.status;
    if (status != 200) {
      console.log(status);
      window.alert("Something went wrong. Please try again.");
    } else {
      console.log("successfully added new account.");
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
        <h1>Add a transaction</h1>
        <p>Please provide the following details of your transaction:</p>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            id="filled-basic"
            label="Transaction Name"
            variant="filled"
            required
            style={{ width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            id="filled-basic"
            label="Amount"
            type="number"
            variant="filled"
            required
            style={{ width: "100%" }}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TypeSelect type={type} setType={setType} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <DayPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <Button
          variant="contained"
          style={{ background: "#65CCB8" }}
          onClick={() => handleSubmit()}
        >
          Add Transaction
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionModal;
