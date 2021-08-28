import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DayPicker from "../DayPicker/DayPicker";
import TypeSelect from "../TypeSelect/TypeSelect";

const TransactionModal = ({ open, handleClose, id, accountTotal }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState("");
  const [value, setValue] = useState("expense");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const transUrl = `/api/updateTransaction?account=${id.toString()}`;
  const handleSubmit = async () => {
    if (name === "" || total === 0 || selectedDate === null || type === "") {
      window.alert("Please fill in all required fields.");
      return;
    }
    let transBody = {};
    let amount = 0;
    if (value === "expense") {
      amount = (Math.round(total * -100) / 100).toFixed(2);
      transBody = {
        transaction: name,
        type,
        date: selectedDate,
        amount,
      };
    } else {
      amount = (Math.round(total * 100) / 100).toFixed(2);
      transBody = {
        transaction: name,
        type,
        date: selectedDate,
        amount,
      };
    }
    const transResponse = await fetch(transUrl, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transBody),
    });
    const transStatus = transResponse.status;
    if (transStatus != 200) {
      console.log(transStatus);
      window.alert("Something went wrong. Please try again.");
    } else {
      console.log("Successfully added new account.");
    }
    const balanceUrl = "/api/accountDetails";
    const balanceResponse = await fetch(balanceUrl, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: accountTotal + parseFloat(amount),
        id: id.toString(),
      }),
    });
    const balanceStatus = balanceResponse.status;
    if (balanceStatus != 200) {
      console.log(balanceStatus);
      window.alert("Something went wrong. Please try again.");
    } else {
      console.log("Successfully changed account balance.");
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
  const [modalStyle] = useState(getModalStyle);
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
            label="Amount ($)"
            type="number"
            variant="filled"
            required
            style={{ width: "100%" }}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
              aria-label="transaction"
              name="transaction"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
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
