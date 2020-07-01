import { AuthAction } from "./../types";
import { SignUpFormFields } from "./../hooks/useSignUpForm";
import { SignInFormFields } from "./../hooks/useSignInForm";
import { Me } from "../types";
import authService from "../services/authService";
import { Dispatch } from "redux";
import { AuthActionType } from "../enums";

export type MeState = Me | null;

const initialState: MeState = null;

function authReducer(state = initialState, action: AuthAction): MeState {
  switch (action.type) {
    case AuthActionType.INIT_ME:
      return action.payload;
    case AuthActionType.SIGN_IN:
      return action.payload;
    case AuthActionType.SIGN_UP:
      return action.payload;
    case AuthActionType.SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
}

export function initMe() {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.getMe();
    console.log(me);

    dispatch({
      type: AuthActionType.INIT_ME,
      payload: me,
    });
  };
}

export function signIn(input: SignInFormFields) {
  return async (dispatch: Dispatch): Promise<void> => {
    console.log(input, "hihhi");

    const me = await authService.signIn(input);
    console.log(me);

    dispatch({
      type: AuthActionType.SIGN_IN,
      payload: me,
    });
  };
}

export function signUp(input: SignUpFormFields) {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.signUp(input);

    dispatch({
      type: AuthActionType.SIGN_UP,
      payload: me,
    });
  };
}

export function signOut() {
  return async (dispatch: Dispatch): Promise<void> => {
    await authService.signOut();

    dispatch({
      type: AuthActionType.SIGN_OUT,
      payload: null,
    });
  };
}

export default authReducer;
