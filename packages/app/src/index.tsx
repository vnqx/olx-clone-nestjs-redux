import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback={<div>loading...</div>}>
        <CssBaseline />
        <App />
      </React.Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
