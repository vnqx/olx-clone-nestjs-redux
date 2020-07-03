import { Dispatch } from "redux";
import { Posting } from "./../types";
import postingsService from "../services/postingsService";

export enum PostingsActionType {
  LOAD_POSTINGS = "LOAD_POSTINGS",
}

export type PostingsState = Posting[];

export interface LoadPostingsAction {
  type: PostingsActionType.LOAD_POSTINGS;
  payload: Posting[];
}

export type PostingsAction = LoadPostingsAction;

export const initialState: PostingsState = [];

function postingsReducer(
  state = initialState,
  action: PostingsAction,
): PostingsState {
  switch (action.type) {
    case PostingsActionType.LOAD_POSTINGS:
      return action.payload;
    default:
      return state;
  }
}

export function loadPostings(filter?: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const postings = filter
      ? await postingsService.getByTitle(filter)
      : await postingsService.getAll();

    dispatch({
      type: PostingsActionType.LOAD_POSTINGS,
      payload: postings,
    });
  };
}

export default postingsReducer;
