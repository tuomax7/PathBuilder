import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import pathReducer from "./reducers/pathReducer";
import pathSorterReducer from "./reducers/pathSorterReducer";

const store = configureStore({
  reducer: {
    paths: pathReducer,
    sortBy: pathSorterReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
