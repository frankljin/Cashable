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

const TypeSelect = ({ type, setType }) => {
  const classes = useStyles();
  return (
    <FormControl variant="filled" className={classes.formControl} style={{ width: "100%" }} required>
      <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Food/Beverage">Food/Beverage</MenuItem>
        <MenuItem value="Rent">Rent</MenuItem>
        <MenuItem value="Utility">Utility</MenuItem>
        <MenuItem value="Education">Education</MenuItem>
        <MenuItem value="Entertainment">Entertainment</MenuItem>
        <MenuItem value="Health">Health</MenuItem>
        <MenuItem value="Expense">Other Expense</MenuItem>
        <MenuItem value="Income">Other Income</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelect;
