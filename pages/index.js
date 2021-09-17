import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Navbar from "../components/Navbar/Navbar";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Home = ({ data }) => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  const classes = useStyles();

  return (
    <>
      <Navbar user={user} />
      {user && (
        <div className={styles.main}>
          <h1>
            Hello, <span className={styles.nameText}>{user.nickname}!</span>
          </h1>
          <p>Welcome to Cashable - A simple and modern expense manager. </p>
          <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={2.5}>
                <Paper className={classes.paper}>Coming Soon</Paper>
              </Grid>
              <Grid item xs={6} sm={2.5}>
                <Paper className={classes.paper}>
                  {" "}
                  <a href="budgets">Budgets</a>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2.5}>
                <Paper className={classes.paper}>
                  <a href="accounts">Accounts</a>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={2.5}>
                <Paper className={classes.paper}>
                  <a href="reports">Reports</a>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

// export async function getStaticProps(context) {
//   const res = await fetch("http://localhost:3000/api/test");
//   const json = await res.json();
//   return {
//     props: {
//       data: json,
//     },
//   };
// }

export default Home;
