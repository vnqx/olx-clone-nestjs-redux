import { Posting } from "./../types";
import { Dispatch } from "redux";
import postingsService from "../services/postingsService";

export enum FollowedPostingsActionType {
  LOAD_FOLLOWED_POSTINGS = "LOAD_FOLLOWED_POSTINGS",
  FOLLOW_POSTING = "FOLLOW_POSTING",
  UNFOLLOW_POSTING = "UNFOLLOW_POSTING",
}

export type FollowedPostingsState = Posting[];

export interface LoadFollowedPostingsAction {
  type: typeof FollowedPostingsActionType.LOAD_FOLLOWED_POSTINGS;
  payload: Posting[];
}

export interface FollowPostingAction {
  type: typeof FollowedPostingsActionType.FOLLOW_POSTING;
  payload: Posting;
}

export interface UnfollowPostingAction {
  type: typeof FollowedPostingsActionType.UNFOLLOW_POSTING;
  payload: Posting;
}

export type FollowedPostingsAction =
  | LoadFollowedPostingsAction
  | FollowPostingAction
  | UnfollowPostingAction;

export const initialState: FollowedPostingsState = [];

export default function followedPostingsReducer(
  state = initialState,
  action: FollowedPostingsAction,
): FollowedPostingsState {
  switch (action.type) {
    case FollowedPostingsActionType.LOAD_FOLLOWED_POSTINGS:
      return action.payload;
    case FollowedPostingsActionType.FOLLOW_POSTING:
      return state.concat(action.payload);
    case FollowedPostingsActionType.UNFOLLOW_POSTING:
      return state.filter((posting) => posting.id !== action.payload.id);
    default:
      return state;
  }
}

export function followPosting(id: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const { isFollowed, posting } = await postingsService.followPosting(id);

    dispatch({
      type: isFollowed
        ? FollowedPostingsActionType.UNFOLLOW_POSTING
        : FollowedPostingsActionType.FOLLOW_POSTING,
      payload: posting,
    });
  };
}

export function loadFollowedPostings() {
  return async (dispatch: Dispatch): Promise<void> => {
    const postings = await postingsService.getAllFollowedPostings();
    dispatch({
      type: FollowedPostingsActionType.LOAD_FOLLOWED_POSTINGS,
      payload: postings,
    });
  };
}
