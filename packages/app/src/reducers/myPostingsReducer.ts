import { Posting } from "./../types";
import { Dispatch } from "redux";
import postingsService from "../services/postingsService";

export enum MyPostingsActionType {
  LOAD_MY_POSTINGS = "LOAD_MY_POSTINGS",
}

export type MyPostingsState = Posting[];

export interface LoadMyPostingsAction {
  type: typeof MyPostingsActionType.LOAD_MY_POSTINGS;
  payload: Posting[];
}

export type MyPostingsAction = LoadMyPostingsAction;

export const initialState: MyPostingsState = [];

export default function myPostingsReducer(
  state = initialState,
  action: MyPostingsAction,
): MyPostingsState {
  switch (action.type) {
    case MyPostingsActionType.LOAD_MY_POSTINGS:
      return action.payload;
    default:
      return state;
  }
}

export function loadMyPostings() {
  return async (dispatch: Dispatch): Promise<void> => {
    const postings = await postingsService.getAllMyPostings();

    dispatch({
      type: MyPostingsActionType.LOAD_MY_POSTINGS,
      payload: postings,
    });
  };
}
