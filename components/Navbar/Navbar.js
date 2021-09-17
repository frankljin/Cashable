import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Image from 'next/image';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      {/* <AppBar position="static" style={{ background: "#182628" }}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ flex: 1 }}
          >
            <Button href="/" color="inherit">
              <Image src="/logo.svg" alt="logo" width="140" height="80" />
            </Button>
          </Typography>
          <Button
            href={user ? "/api/auth/logout" : "/api/auth/login"}
            color="inherit"
          >
            {user ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{flex: 1}}>
          <Image src="/logo.svg" alt="logo" width="140" height="80" />
          </Typography>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><a href="/">Dashboard</a></MenuItem>
                <MenuItem onClick={handleClose}><a href="/accounts">Accounts</a></MenuItem>
                <MenuItem onClick={handleClose}><a href="/budgets">Budgets</a></MenuItem>
                <MenuItem onClick={handleClose}><a href="/reports">Reports</a></MenuItem>
                <MenuItem onClick={handleClose}><a href="/api/auth/logout">Logout</a></MenuItem>
              </Menu>
            </div>
          )}
          {!user && <Button
            href={"/api/auth/login"}
            color="inherit"
          >
            Login
          </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
