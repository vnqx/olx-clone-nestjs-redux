import { SignUpFormFields } from "./../hooks/useSignUpForm";
import { SignInFormFields } from "./../hooks/useSignInForm";
import { Me } from "../types";
import authService from "../services/authService";
import { Dispatch } from "redux";

export enum AuthActionType {
  INIT_ME = "INIT_ME",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

export interface InitMeAction {
  type: typeof AuthActionType.INIT_ME;
  payload: Me;
}

export interface SignInAction {
  type: typeof AuthActionType.SIGN_IN;
  payload: Me;
}

export interface SignUpAction {
  type: typeof AuthActionType.SIGN_UP;
  payload: Me;
}

export interface SignOutAction {
  type: typeof AuthActionType.SIGN_OUT;
  payload: Me;
}

export type AuthAction =
  | InitMeAction
  | SignInAction
  | SignUpAction
  | SignOutAction;

export interface AuthState {
  me: Me | null;
}

export const initialState: AuthState = {
  me: null,
};

function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.INIT_ME:
      return { ...state, me: action.payload };
    case AuthActionType.SIGN_IN:
      return { ...state, me: action.payload };
    case AuthActionType.SIGN_UP:
      return { ...state, me: action.payload };
    case AuthActionType.SIGN_OUT:
      return { ...state, me: action.payload };
    default:
      return state;
  }
}

export function initMe() {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.getMe();
    dispatch({
      type: AuthActionType.INIT_ME,
      payload: me,
    });
  };
}

export function signIn(input: SignInFormFields) {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await authService.signIn(input);

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
