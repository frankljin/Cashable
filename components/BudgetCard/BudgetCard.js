import React from "react";
import {
  Card,
  CardContent,
  TextField,
  LinearProgress,
  Fab,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const BudgetCard = ({ name, spent, max, edit }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            {edit ? <TextField label="Name" /> : <p>{name}</p>}
            {!edit && (
              <h2>
                {formatter.format(spent)} / {formatter.format(max)}
              </h2>
            )}
            {edit && (
              <h2>
                <TextField label="Spending Limit ($)" />
              </h2>
            )}
            {!edit && <p>({formatter.format(max - spent)} left to spend)</p>}
          </Grid>
          {edit && (
            <Grid item>
              <Fab color="primary" aria-label="add" style={{ flex: 1, marginTop: "3rem" }}>
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
