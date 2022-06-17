import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link
        to="/"
        className={classes.brandContainer}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Typography variant="h7" component="h7">
          <h1 className="font-loader">Story Notes</h1>
        </Typography>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                {user?.result.name}
              </Link>
            </Typography>

            <Link to="/chat">
              <Button>
                <MessageIcon />
              </Button>
            </Link>

            <Button>
              <NotificationsIcon />
            </Button>

            <Button
              variant="outlined"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="outlined"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
