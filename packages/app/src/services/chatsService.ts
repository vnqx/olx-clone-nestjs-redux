import { ChatPreview, Message } from "./../interfaces";
import Axios from "axios";

const baseUrl = "http://localhost:4000/chats";

async function getAllChats(): Promise<ChatPreview[]> {
  const { data: chats } = await Axios.get<ChatPreview[]>(baseUrl, {
    withCredentials: true,
  });

  return chats;
}

async function getChat(postingId: string): Promise<ChatPreview> {
  const { data: chat } = await Axios.get<ChatPreview>(
    `http://localhost:4000/postings/${postingId}/chat`,
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
    `http://localhost:4000/chats/${chatId}`,
    { content },
    { withCredentials: true },
  );

  return message;
}

export default { getAllChats, getChat, sendMessage };
