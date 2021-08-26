import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ user }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#182628" }}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ flex: 1 }}
          >
            <Button href="/" color="inherit">
              Cashable
            </Button>
          </Typography>
          <Button
            href={user ? "/api/auth/logout" : "/api/auth/login"}
            color="inherit"
          >
            {user ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
