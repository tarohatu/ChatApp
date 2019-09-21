import React from "react";
import { Subscribe, Provider } from "unstated";
import AppContainer from "../containers/AppContainer";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./main/Main";
import CreateItem from "./main/CreateItem";
import DetailPage from "./main/Detail";
import Container from '@material-ui/core/Container';

const MainPage = props => {

  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => (
          <>
            <Container style={{marginTop: '70px', marginBottom: 55 }}>
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
          </>
        )}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(MainPage);
