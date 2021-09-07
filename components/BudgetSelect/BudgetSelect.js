import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BudgetSelect = ({ budget, setBudget, budgets, total }) => {
  const classes = useStyles();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <FormControl
      variant="filled"
      className={classes.formControl}
      style={{ width: "100%" }}
      required
    >
      <InputLabel id="demo-simple-select-filled-label">Budget</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={budget}
        onChange={(e) => {
          setBudget(e.target.value);
          console.log(e.target.value)
        }}
      >
        {budgets.map((entry) => {
          if (entry.limit - entry.spent >= total) {
            return (
              <MenuItem value={entry} key={entry._id}>
                {entry.budgetName} (
                {formatter.format(entry.limit - entry.spent)} available)
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default BudgetSelect;
