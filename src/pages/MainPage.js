import React from "react";
import { Subscribe, Provider } from "unstated";
import AppContainer from "../containers/AppContainer";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./main/Main";
import CreateItem from "./main/CreateItem";
import DetailPage from "./main/Detail";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "70px",
    marginBottom: 55
  },
  leftBorder: {
    height: "100vh",
    width: "6px",
    background: "#6B484F",
    position: "fixed",
    top: "0px",
    right: "0px",
    zIndex: -1
  }
}))

const MainPage = props => {
  const classes = useStyles();
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => (
          <>
            <Container
              className={classes.container}
            >
            <Switch>
              <Route
                path="/items/details/:id"
                render={() => <DetailPage app={app} />}
              />
              <Route
                path="/items/new"
                render={() => <CreateItem app={app} />}
              />
              <Route exact path="/items/home" render={() => <Main />} />
              <Redirect to="/items/home" />
            </Switch>
            </Container>
            <div className={classes.leftBorder}/>
          </>
        )}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(MainPage);
