import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/meReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import postingsReducer from "./reducers/postingsReducer";
import photosReducer from "./reducers/photosReducer";
import meReducer from "./reducers/meReducer";
import fullPostingReducer from "./reducers/fullPostingReducer";
import followedPostingsReducer from "./reducers/followedPostingsReducer";
import myPostingsReducer from "./reducers/myPostingsReducer";
import filterReducer from "./reducers/filterReducer";

const rootReducer = combineReducers({
  me: meReducer,
  postings: postingsReducer,
  followedPostings: followedPostingsReducer,
  myPostings: myPostingsReducer,
  fullPosting: fullPostingReducer,
  photos: photosReducer,
  filter: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
