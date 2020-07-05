import { Dispatch } from "redux";
import { ChatPreview } from "./../interfaces";
import chatsService from "../services/chatsService";

export enum ChatActionType {
  LOAD_CHATS = "LOAD_CHATS",
}

export interface LoadChatsAction {
  type: typeof ChatActionType.LOAD_CHATS;
  payload: ChatPreview[];
}

export type ChatAction = LoadChatsAction;

export type ChatState = ChatPreview[];

export const initialState: ChatState = [];

export default function chatsReducer(
  state = initialState,
  action: ChatAction,
): ChatPreview[] {
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
