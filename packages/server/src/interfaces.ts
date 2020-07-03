import User from "./users/user.entity";
import { Request } from "express";
import Posting from "./postings/posting.entity";

export interface ReqWithUser extends Request {
  user: User;
}

export interface Token {
  userId: string;
}

export interface FollowPosting {
  isFollowed: boolean;
  posting: Posting;
}
