import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useHistory, Link, useLocation } from 'react-router-dom';
import UserPool from '../UserPool';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({loggedIn, setLoggedIn}) {
  const classes = useStyles();
  // const [loggedIn, setLoggedIn] = React.useState(props.loggedIn);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let history = useHistory();
  let location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signUp = event => {
    event.preventDefault();
    history.push("/SignUp")
  }

  const logIn = event => {
    event.preventDefault();
    history.push("/Login")
  }
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'white'
  }

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        user.signOut();
        setLoggedIn(false);
        if (location.state != undefined) {
          console.log("Number of keys in locaiton state: " + Object.keys(location.state));
          delete location.state.loggedIn;
        }
        console.log("Logging out");
    }
  };
  console.log(loggedIn)
  // const Sidebar

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" 
                      aria-label="menu" 
                      aria-controls="menu-appbar-1"
                      aria-haspopup="true"
                      // onClick={handleMenu}
                      > */}
            {/* <Sidebar/> */}
              {/* <MenuIcon></MenuIcon> */}
          {/* </IconButton> */}
          <Sidebar loggedIn={loggedIn}/>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={linkStyle}>FinStack</Link>
          </Typography>

          {loggedIn ? (
            <div>
              <Button variant="contained" color="primary" onClick={logout}>
                  Log Out
              </Button>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) :
          <div>
              <Button variant="contained" color="primary" onClick={logIn}>
                Log In
              </Button>
              <Button variant="contained" color="primary" onClick={signUp}>
                Sign Up
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;


