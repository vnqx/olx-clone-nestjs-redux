import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postingsReducer from "./reducers/postingsReducer";
import photosReducer from "./reducers/photosReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  postings: postingsReducer,
  photos: photosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
