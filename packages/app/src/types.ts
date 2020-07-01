import { AuthActionType } from "./enums";

export interface Me {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
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
