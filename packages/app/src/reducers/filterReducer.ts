import { Dispatch } from "redux";
export enum FilterActionType {
  RESET = "RESET",
  CHANGE = "CHANGE",
}

export interface ResetFilterActionType {
  type: typeof FilterActionType.RESET;
}

export interface ChangeFilterActionType {
  type: typeof FilterActionType.CHANGE;
  payload: string;
}

export type FilterAction = ChangeFilterActionType | ResetFilterActionType;

export type FilterState = string;

export const initialState: FilterState = "";

export default function filterReducer(
  state = initialState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case FilterActionType.RESET:
      return "";
    case FilterActionType.CHANGE:
      return action.payload;
    default:
      return state;
  }
}

export function changeFilter(newFilter: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: FilterActionType.CHANGE,
      payload: newFilter,
    });
  };
}

export function resetFilter() {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: FilterActionType.RESET,
    });
  };
}
