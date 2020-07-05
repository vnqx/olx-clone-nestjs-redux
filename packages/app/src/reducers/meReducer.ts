import { User } from "../interfaces";
import { SignUpFormFields } from "../hooks/useSignUpForm";
import { SignInFormFields } from "../hooks/useSignInForm";
import authService from "../services/authService";
import { Dispatch } from "redux";

export enum MeActionType {
  LOAD_ME = "LOAD_ME",
  LOADING_ME = "LOADING_ME",
  REMOVE_ME = "REMOVE_ME",
}

export interface LoadMeAction {
  type: typeof MeActionType.LOAD_ME;
  payload: User;
}

export interface RemoveMeAction {
  type: typeof MeActionType.REMOVE_ME;
  payload: null;
}

export type MeAction = LoadMeAction | RemoveMeAction;

export type MeState = User | null;

export const initialState: MeState = null;

function meReducer(state = initialState, action: MeAction): MeState {
  switch (action.type) {
    case MeActionType.LOAD_ME:
      return action.payload;
    case MeActionType.REMOVE_ME:
      return null;
    default:
      return state;
  }
}

export function loadMe() {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.getMe();
    dispatch({
      type: MeActionType.LOAD_ME,
      payload: me,
    });
  };
}

export function signIn(
  input: SignInFormFields,
  navigate: (text: string) => void,
) {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.signIn(input);

    dispatch({
      type: MeActionType.LOAD_ME,
      payload: me,
    });

    navigate("/");
  };
}

export function signUp(
  input: SignUpFormFields,
  navigate: (text: string) => void,
) {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.signUp(input);

    dispatch({
      type: MeActionType.LOAD_ME,
      payload: me,
    });

    navigate("/");
  };
}

export function signOut(navigate: (text: string) => void) {
  return async (dispatch: Dispatch): Promise<void> => {
    await authService.signOut();

    dispatch({
      type: MeActionType.REMOVE_ME,
    });

    navigate("/");
  };
}

export default meReducer;
