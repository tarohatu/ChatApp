import React from "react";
import { Subscribe, Provider } from "unstated";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import AppContainer from "../containers/AppContainer";

export default () => {
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  };
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {app => (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        )}
      </Subscribe>
    </Provider>
  );
};
