import React from "react";
import { Subscribe, Provider } from "unstated";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppContainer from "../../containers/AppContainer";
import { withRouter } from "react-router";
import ItemList from "./ItemList";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    margin: theme.spacing(1),
    bottom: "20px",
    right: "20px"
  }
}));

const Main = (props) => {
  const classes = useStyles();
  const { history } = props;

  const redirectToCreate = () => {
    history.push('/items/new');
  }

  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => {
          return(
          <>
            <ItemList app={app} />
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
              size="medium"
              onClick={redirectToCreate}
            >
              <AddIcon />
            </Fab>
          </>
        )}}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(Main);
