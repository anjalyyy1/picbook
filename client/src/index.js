import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import configureTheme from "./theme";
import { Provider } from "react-redux";
import { store } from "store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={configureTheme()}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
