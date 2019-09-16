import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AppContainer from "../containers/AppContainer";
import LoginPage from "./Login";
import Main from "./MainPage";
import { Provider, Subscribe } from "unstated";

class Application extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  renderMainPage() {
    const { app } = this.props;
    if (app.state.isSignIn) {
      return <Main />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  renderLoginPage() {
    const { app } = this.props;
    if (app.state.isSignIn) {
      return <Redirect to="/items" />;
    } else {
      return <LoginPage />;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/items" render={() => this.renderMainPage()} />
          <Route path="/login" render={() => this.renderLoginPage()} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

Application.propTypes = {
  app: PropTypes.object.isRequired
};

const ApplicationWrapper = () => {
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => <Application app={app} />}
      </Subscribe>
    </Provider>
  );
};

export default ApplicationWrapper;
