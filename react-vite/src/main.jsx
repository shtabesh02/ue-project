import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import * as restaurantActions from "./redux/restautants";
import "./index.css";

const store = configureStore();

// console.log("Environment:", import.meta.env.MODE)
if (import.meta.env.MODE !== "development") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.restaurantActions = restaurantActions;
  // window.store.dispatch(window.restaurantActions.loadRestaurants());
  // console.log("window.restaurantActions" , window.restaurantActions)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
