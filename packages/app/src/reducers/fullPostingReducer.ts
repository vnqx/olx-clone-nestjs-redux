import { Posting } from "../types";
import postingsService from "../services/postingsService";
import { Dispatch } from "redux";
import { CreatePostingFormFields } from "../hooks/useCreatePosting";

export enum FullPostingActionType {
  LOAD_FULL_POSTING = "LOAD_FULL_POSTING",
}

export interface LoadFullPostingAction {
  type: typeof FullPostingActionType.LOAD_FULL_POSTING;
  payload: Posting;
}

export type FullPostingAction = LoadFullPostingAction;

export type FullPostingState = Posting | null;

export const initialState: FullPostingState = null;

export default function fullPostingReducer(
  state = initialState,
  action: FullPostingAction,
): FullPostingState {
  switch (action.type) {
    case FullPostingActionType.LOAD_FULL_POSTING:
      return action.payload;
    default:
      return state;
  }
}

export function loadFullPosting(id: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const posting = await postingsService.getById(id);

    dispatch({
      type: FullPostingActionType.LOAD_FULL_POSTING,
      payload: posting,
    });
  };
}

export function createPosting(
  input: CreatePostingFormFields,
  // navigate: NavigateFunction,
  // seems like NavigateFunction is not exported
  navigate: (text: string) => void,
) {
  return async (dispatch: Dispatch): Promise<void> => {
    const posting = await postingsService.create(input);
    dispatch({
      type: FullPostingActionType.LOAD_FULL_POSTING,
      payload: posting,
    });

    navigate(`/postings/${posting.id}`);
  };
}
