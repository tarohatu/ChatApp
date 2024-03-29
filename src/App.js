import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Application from "./pages/Application";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    body1: {
      fontFamily: 'uzura'
    },
    h6: {
      fontFamily: 'uzura',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      listStyle: 'none'
    }
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
