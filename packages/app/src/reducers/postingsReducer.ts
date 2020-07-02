import { CreatePostingFormFields } from "./../hooks/useCreatePosting";
import { Dispatch } from "redux";
import { Posting } from "./../types";
import postingsService from "../services/postingsService";

export enum PostingsActionType {
  INIT_POSTINGS = "INIT_POSTINGS",
  CREATE_POSTING = "CREATE_POSTING",
}

export type PostingsState = Posting[];

export interface InitPostingsAction {
  type: PostingsActionType.INIT_POSTINGS;
  payload: Posting[];
}

export interface CreatePostingAction {
  type: PostingsActionType.CREATE_POSTING;
  payload: Posting;
}

export type PostingsAction = InitPostingsAction | CreatePostingAction;

export const initialState: PostingsState = [];

function postingsReducer(
  state = initialState,
  action: PostingsAction,
): PostingsState {
  switch (action.type) {
    case PostingsActionType.INIT_POSTINGS:
      return action.payload;
    case PostingsActionType.CREATE_POSTING:
      return state.concat(action.payload);
    default:
      return state;
  }
}

export function initPostings() {
  return async (dispatch: Dispatch): Promise<void> => {
    const postings = await postingsService.getAll();
    dispatch({
      type: PostingsActionType.INIT_POSTINGS,
      payload: postings,
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
      type: PostingsActionType.CREATE_POSTING,
      payload: posting,
    });

    navigate(`/postings/${posting.id}`);
  };
}

export default postingsReducer;
