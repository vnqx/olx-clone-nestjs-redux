import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/meReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postingsReducer from "./reducers/postingsReducer";
import photosReducer from "./reducers/photosReducer";
import meReducer from "./reducers/meReducer";
import fullPostingReducer from "./reducers/fullPostingReducer";
import followedPostingsReducer from "./reducers/followedPostingsReducer";

const rootReducer = combineReducers({
  me: meReducer,
  postings: postingsReducer,
  followedPostings: followedPostingsReducer,
  fullPosting: fullPostingReducer,
  photos: photosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
