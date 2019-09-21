import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import firebase from "firebase";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    top: "0px",
    zIndex: 99,
    margin: "0px 0px 0px -16px",
    width: "100vw",
  },
  appBar: {
  },
  stripe: {
    width: "100vw",
    height: "7px",
    backgroundColor: "#F6F6F6",
    position: "absolute",
    bottom: "7px",
    right: 0,
    left: 0,
    zIndex: -1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

const MenuAppBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    firebase.auth().signOut();
  }

  function renderIcon() {
    const { user } = props;
    if (user.photoURL) {
      return <Avatar alt={user.displayName} src={user.photoURL}/>;
    } else {
      return <AccountCircle />;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {props.children}
            <div className={classes.title} />
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {renderIcon()}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleLogout}>Profile</MenuItem>
              </Menu>
              <div className={classes.stripe}/>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

export default withRouter(MenuAppBar);
