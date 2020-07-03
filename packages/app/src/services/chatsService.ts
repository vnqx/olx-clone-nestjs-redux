import { Chat } from "./../interfaces";
import Axios from "axios";

const baseUrl = "http://localhost:4000/chats";

async function getAllChats(): Promise<Chat[]> {
  const { data: chats } = await Axios.get<Chat[]>(baseUrl, {
    withCredentials: true,
  });

  return chats;
}

async function getChat(postingId: string): Promise<Chat> {
  const { data: chat } = await Axios.get<Chat>(
    `http://localhost:4000/postings/${postingId}/chat`,
    { withCredentials: true },
  );

  console.log(chat);

  return chat;
}

export default { getAllChats, getChat };
