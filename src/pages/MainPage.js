import React from "react";
import { Subscribe, Provider } from "unstated";
import AppContainer from "../containers/AppContainer";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from 'react-router-dom';
import AppBar from "./shared/AppBar";
import Main from './main/Main';
import CreateItem from './main/CreateItem';

const MainPage = (props) => {
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => (
          <>
            <AppBar user={app.getUser()} />
            <Switch>
              <Route path='/items/new' render={() => <CreateItem app={app} /> } />
              <Route exact path='/items/home' render={() => <Main /> } />
              <Redirect to='/items/home' />
            </Switch>
          </>
        )}
      </Subscribe>
    </Provider>
  );
};

export default withRouter(MainPage);
