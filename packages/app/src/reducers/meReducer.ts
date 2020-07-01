import { Me } from "./../types";
import meService from "../services/authService";
import { Dispatch } from "redux";

enum Type {
  INIT_ME = "INIT_ME",
}

export interface InitMeAction {
  type: typeof Type.INIT_ME;
  payload: Me;
}

export type MeActionTypes = InitMeAction;

export interface MeState {
  me: Me | null;
}

const initialState: MeState = {
  me: null,
};

const meReducer = (state = initialState, action: MeActionTypes): MeState => {
  switch (action.type) {
    case Type.INIT_ME:
      return { me: action.payload };
    default:
      return state;
  }
};

export const initializeMe = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const me = await meService.getMe();
    dispatch({
      type: "INIT_ME",
      payload: me,
    });
  };
};
export default meReducer;
