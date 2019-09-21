import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Subscribe, Provider } from "unstated";
import AppContainer from "../../containers/AppContainer";
import { withRouter } from "react-router";
import ItemList from "./ItemList";
import AppBar from "../shared/AppBar";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BottomNavigation from '../shared/BottomNavigation';
const useStyles = makeStyles(theme => ({
  icon: {
    color: "white"
  }
}));

const Main = props => {
  const classes = useStyles();

  const redirectToCreate = () => {
    const { history } = props;
    history.push("/items/new");
  };

  const rightBarIcon = <IconButton onClick={redirectToCreate}><AddIcon className={classes.icon}/></IconButton>


  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => {
          return (
            <>
              <AppBar app={app} user={app.getUser()} children={rightBarIcon} {...props} />
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
