import { Posting } from "./../../app/src/types";
import User from "./users/user.entity";
import { Request } from "express";

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
