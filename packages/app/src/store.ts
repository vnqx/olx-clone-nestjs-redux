import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postingsReducer from "./reducers/postingsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  postings: postingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
