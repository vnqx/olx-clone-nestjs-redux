import { Dispatch } from "redux";
import { Chat } from "./../interfaces";
import chatsService from "../services/chatsService";

export enum FullChatActionType {
  LOAD_CHAT = "LOAD_CHAT",
}

export interface LoadChatActionType {
  type: FullChatActionType.LOAD_CHAT;
  payload: Chat;
}

export type FullChatAction = LoadChatActionType;

export type FullChatState = Chat | null;

export const initialState: FullChatState = null;

export default function fullChatReducer(
  state = initialState,
  action: FullChatAction,
): FullChatState {
  switch (action.type) {
    case FullChatActionType.LOAD_CHAT:
      return action.payload;
    default:
      return state;
  }
}

export function loadFullChat(postingId: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const chat = await chatsService.getChat(postingId);

    dispatch({
      type: FullChatActionType.LOAD_CHAT,
      payload: chat,
    });
  };
}
