import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Subscribe, Provider } from "unstated";
import AppContainer from "../../containers/AppContainer";
import { withRouter } from "react-router";
import ItemList from "./ItemList";
import AppBar from "../shared/AppBar";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import BottomNavigation from '../shared/BottomNavigation';
const useStyles = makeStyles(theme => ({
  icon: {
    color: "white"
  },
  addButtonArea: {
    width: "60px",
    height: "50px",
    position: "fixed",
    top: "62px",
    right: "0px",
    backgroundColor: "white",
    border: "solid 1px #38424666",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    zIndex: 10000,
    paddingTop: "4px",
    paddingLeft: "9px"
  }
}));

const Main = props => {
  const classes = useStyles();

  const redirectToCreate = () => {
    const { history } = props;
    history.push("/items/new");
  };

  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => {
          return (
            <>
              <AppBar app={app} user={app.getUser()} {...props} />
              <div className={classes.addButtonArea}>
                <Fab color="primary" aria-label="add" size="small" onClick={redirectToCreate}>
                  <AddIcon className={classes.icon}/>
                </Fab>
              </div>
              <ItemList app={app} />
              <BottomNavigation main="/items/home" />
            </>
          );
        }}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(Main);
