import { Dispatch } from "redux";
import postingsService from "../services/postingsService";
import { Posting } from "../interfaces";

export enum MyPostingsActionType {
  LOAD_MY_POSTINGS = "LOAD_MY_POSTINGS",
  DELETE_MY_POSTING = "DELETE_MY_POSTING",
  ADD_MY_POSTING = "ADD_MY_POSTING",
  EDIT_MY_POSTING = "EDIT_MY_POSTING",
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

export interface AddMyPostingAction {
  type: typeof MyPostingsActionType.ADD_MY_POSTING;
  payload: Posting;
}

export interface EditMyPostingAction {
  type: typeof MyPostingsActionType.EDIT_MY_POSTING;
  payload: Posting;
}

export type MyPostingsAction =
  | LoadMyPostingsAction
  | DeleteMyPostingAction
  | AddMyPostingAction
  | EditMyPostingAction;

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
    case MyPostingsActionType.ADD_MY_POSTING:
      return state.concat(action.payload);
    case MyPostingsActionType.EDIT_MY_POSTING:
      return state.map((posting) =>
        posting.id === action.payload.id ? action.payload : posting,
      );
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
