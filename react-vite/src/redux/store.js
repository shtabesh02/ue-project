import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
	combineReducers,
  } from "redux";
  import thunk from "redux-thunk";
  import logger from "redux-logger"; // Import logger synchronously
  import sessionReducer from "./session";
  import restaurantsReducer from "./restaurants";
  import cartReducer from "./cart";

  const rootReducer = combineReducers({
	session: sessionReducer,
	restaurants: restaurantsReducer,
	cart: cartReducer,
  });

  const middleware = [thunk, logger];

  const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
