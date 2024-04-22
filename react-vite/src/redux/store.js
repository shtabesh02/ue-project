import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { default as logger } from "redux-logger"; // Import logger synchronously
import sessionReducer from "./session";
import restaurantReducer from "./restaurants";

// const rootReducer = combineReducers({
//   session: sessionReducer,
//   restaurants: restaurantReducer
// });

// let enhancer;

// // Always include logger middleware
// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// enhancer = composeEnhancers(applyMiddleware(thunk, logger));

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;


const rootReducer = combineReducers({
  session: sessionReducer,
  restaurants: restaurantReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
