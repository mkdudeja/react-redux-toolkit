import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { jssPreset, StylesProvider } from "@material-ui/core/styles";
import { create } from "jss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./app/app.component";
import { store } from "./app/state";
import theme from "./index.style";
import * as serviceWorker from "./serviceWorker";
import "./style.scss";
const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: "jss-insertion-point",
});

ReactDOM.render(
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
