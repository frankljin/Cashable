import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  LinearProgress,
  Fab,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const BudgetCard = ({ name, spent, max, edit, sub }) => {
  const [budgetName, setBudgetName] = useState("");
  const [limit, setLimit] = useState(0);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const accountUrl = "/api/budgets";
  const handleSubmit = async () => {
    const accountResponse = await fetch(accountUrl, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetName, limit: parseFloat(limit), sub, spent: 0 }),
    });
    const accountStatus = accountResponse.status;
    if (accountStatus != 200) {
      console.log(status);
      window.alert("Something went wrong. Please try again.");
    } else {
      console.log("successfully added new budget.");
      location.reload();
    }
  };
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            {edit ? (
              <TextField
                label="Name"
                onChange={(e) => setBudgetName(e.target.value)}
              />
            ) : (
              <p>{name}</p>
            )}
            {!edit && (
              <h2>
                {formatter.format(spent)} / {formatter.format(max)}
              </h2>
            )}
            {edit && (
              <h2>
                <TextField
                  label="Spending Limit ($)"
                  onChange={(e) => setLimit(e.target.value)}
                />
              </h2>
            )}
            {!edit && <p>({formatter.format(max - spent)} left to spend)</p>}
          </Grid>
          {edit && (
            <Grid item>
              <Fab
                color="primary"
                aria-label="add"
                style={{ flex: 1, marginTop: "3rem" }}
                onClick={() => handleSubmit()}
              >
                <AddIcon />
              </Fab>
            </Grid>
          )}
        </Grid>
        {!edit && (
          <LinearProgress variant="determinate" value={(spent / max) * 100} />
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
