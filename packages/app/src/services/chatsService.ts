import { ChatPreview, Message } from "./../interfaces";
import Axios from "axios";
import { BASE_URL } from "../common/constants";

async function getAllChats(): Promise<ChatPreview[]> {
  const { data: chats } = await Axios.get<ChatPreview[]>(`${BASE_URL}/chats`, {
    withCredentials: true,
  });

  return chats;
}

async function getChat(postingId: string): Promise<ChatPreview> {
  const { data: chat } = await Axios.get<ChatPreview>(
    `${BASE_URL}/postings/${postingId}/chat`,
    { withCredentials: true },
  );

  return chat;
}

interface SendMessageVars {
  content: string;
  chatId: string;
}

async function sendMessage({
  content,
  chatId,
}: SendMessageVars): Promise<Message> {
  const { data: message } = await Axios.post<Message>(
    `${BASE_URL}/chats/${chatId}`,
    { content },
    { withCredentials: true },
  );

  return message;
}

export default { getAllChats, getChat, sendMessage };
