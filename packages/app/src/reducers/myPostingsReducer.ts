import { Posting } from "./../types";
import { Dispatch } from "redux";
import postingsService from "../services/postingsService";

export enum MyPostingsActionType {
  LOAD_MY_POSTINGS = "LOAD_MY_POSTINGS",
  DELETE_MY_POSTING = "DELETE_MY_POSTING",
}

export type MyPostingsState = Posting[];

export interface LoadMyPostingsAction {
  type: typeof MyPostingsActionType.LOAD_MY_POSTINGS;
  payload: Posting[];
}

export interface DeleteMyPostingAction {
  type: typeof MyPostingsActionType.DELETE_MY_POSTING;
  payload: string;
}

export type MyPostingsAction = LoadMyPostingsAction | DeleteMyPostingAction;

export const initialState: MyPostingsState = [];

export default function myPostingsReducer(
  state = initialState,
  action: MyPostingsAction,
): MyPostingsState {
  switch (action.type) {
    case MyPostingsActionType.LOAD_MY_POSTINGS:
      return action.payload;
    case MyPostingsActionType.DELETE_MY_POSTING:
      return state.filter((posting) => posting.id !== action.payload);
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

export function deleteMyPosting(id: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const isDeleted = await postingsService.remove(id);

    if (isDeleted)
      dispatch({
        type: MyPostingsActionType.DELETE_MY_POSTING,
        payload: id,
      });
  };
}
