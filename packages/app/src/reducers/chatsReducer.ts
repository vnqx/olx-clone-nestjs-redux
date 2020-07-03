import { Dispatch } from "redux";
import { Chat } from "./../interfaces";
import chatsService from "../services/chatsService";

export enum ChatActionType {
  LOAD_CHATS = "LOAD_CHATS",
}

export interface LoadChatsAction {
  type: typeof ChatActionType.LOAD_CHATS;
  payload: Chat[];
}

export type ChatAction = LoadChatsAction;

export type ChatState = Chat[];

export const initialState: ChatState = [];

export default function chatsReducer(
  state = initialState,
  action: ChatAction,
): Chat[] {
  switch (action.type) {
    case ChatActionType.LOAD_CHATS:
      return action.payload;
    default:
      return state;
  }
}

export function loadChats() {
  return async (dispatch: Dispatch): Promise<void> => {
    const chats = await chatsService.getAllChats();

    dispatch({
      type: ChatActionType.LOAD_CHATS,
      payload: chats,
    });
  };
}
