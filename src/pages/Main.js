import React from "react";
import { Subscribe, Provider } from "unstated";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppContainer from "../containers/AppContainer";
import { withRouter } from "react-router";
import AppBar from "./shared/AppBar";
import ItemList from "./main/ItemList";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    margin: theme.spacing(1),
    bottom: "20px",
    right: "20px"
  }
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => (
          <>
            <AppBar user={app.getUser()} />
            <ItemList app={app} />
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
              size="medium"
            >
              <AddIcon />
            </Fab>
          </>
        )}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(Main);
