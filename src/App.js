import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Application from "./pages/Application";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
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
