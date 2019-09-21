import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Application from "./pages/Application";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main:  "#6B484F" },
    secondary: { main: "#AC7E69" }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </div>
  );
}

export default App;
