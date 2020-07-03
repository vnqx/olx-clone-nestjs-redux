import { CreatePostingFormFields } from "./../hooks/useCreatePosting";
import { Dispatch } from "redux";
import { Posting } from "./../types";
import postingsService from "../services/postingsService";

export enum PostingsActionType {
  INIT_POSTING = "INIT_POSTING",
  INIT_POSTINGS = "INIT_POSTINGS",
  CREATE_POSTING = "CREATE_POSTING",
}

export interface PostingsState {
  all: Posting[];
  fullPosting: Posting | null;
}

export interface InitPostingsAction {
  type: PostingsActionType.INIT_POSTINGS;
  payload: Posting[];
}

export interface CreatePostingAction {
  type: PostingsActionType.CREATE_POSTING;
  payload: Posting;
}

export interface InitPostingAction {
  type: PostingsActionType.INIT_POSTING;
  payload: Posting;
}

export type PostingsAction =
  | InitPostingsAction
  | CreatePostingAction
  | InitPostingAction;

export const initialState: PostingsState = {
  all: [],
  fullPosting: null,
};

function postingsReducer(
  state = initialState,
  action: PostingsAction,
): PostingsState {
  switch (action.type) {
    case PostingsActionType.INIT_POSTING:
      return { ...state, fullPosting: action.payload };
    case PostingsActionType.INIT_POSTINGS:
      return { ...state, all: action.payload };
    case PostingsActionType.CREATE_POSTING:
      return {
        ...state,
        all: state.all.concat(action.payload),
        fullPosting: action.payload,
      };
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

export function initPosting(id: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const posting = await postingsService.getById(id);

    dispatch({
      type: PostingsActionType.INIT_POSTING,
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
      type: PostingsActionType.CREATE_POSTING,
      payload: posting,
    });

    navigate(`/postings/${posting.id}`);
  };
}

export default postingsReducer;
