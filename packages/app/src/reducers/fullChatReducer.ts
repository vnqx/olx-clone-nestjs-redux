import { Dispatch } from "redux";
import { ChatPreview, FullChat, Message } from "./../interfaces";
import chatsService from "../services/chatsService";

export enum FullChatActionType {
  LOAD_CHAT = "LOAD_CHAT",
  ADD_MESSAGE = "ADD_MESSAGE",
}

export interface LoadChatActionType {
  type: FullChatActionType.LOAD_CHAT;
  payload: FullChat;
}

export interface AddMessageAction {
  type: typeof FullChatActionType.ADD_MESSAGE;
  payload: Message;
}

export type FullChatAction = LoadChatActionType | AddMessageAction;

export type FullChatState = FullChat | null;

export const initialState: FullChatState = null;

export default function fullChatReducer(
  state = initialState,
  action: FullChatAction,
): FullChatState {
  switch (action.type) {
    case FullChatActionType.LOAD_CHAT:
      return action.payload;
    case FullChatActionType.ADD_MESSAGE:
      return state
        ? { ...state, messages: state?.messages.concat(action.payload) }
        : state;
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

interface SendMessageVars {
  content: string;
  chatId: string;
}

export function sendMessage({ content, chatId }: SendMessageVars) {
  return async (dispatch: Dispatch): Promise<void> => {
    const message = await chatsService.sendMessage({ content, chatId });

    dispatch({
      type: FullChatActionType.ADD_MESSAGE,
      payload: message,
    });
  };
}
