import { SendMessageDto } from "./chats/dto/sendMessage.dto";
import User from "./users/user.entity";
import { Request } from "express";
import Posting from "./postings/posting.entity";

export interface ReqWithUser extends Request {
  user: User;
}

export interface TokenPayload {
  userId: string;
}

export interface FollowPosting {
  isFollowed: boolean;
  posting: Posting;
}

export interface SendMessageArgs {
  chatId: string;
  userId: string;
  sendMessageDto: SendMessageDto;
}
