import { Container } from "unstated";
import firebase from "firebase";
import config from "../config/config";

class AppContainer extends Container {
  state = {
    user: null,
    isSignIn: false,
    appHeader: 'Home',
  };

  constructor() {
    super();
    firebase.initializeApp(config);
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user,
        isSignIn: !!user
      });
    });
    this.db = firebase.firestore();
  }

  isSignIn() {
    return this.state.isSignIn;
  }

  getUser() {
    return this.state.user;
  }

  auth() {
    return firebase.auth();
  }

  logout() {
    this.unregisterAuthObserver();
  }

  getDb() {
    return this.db;
  }

  changeAppHeader(newValue) {
    this.setState({
      appHeader: newValue
    });
  }
}

export default AppContainer;
