import { HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../users/user.entity";
import Chat from "./chat.entity";
import Posting from "../postings/posting.entity";

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Chat) private readonly chatsRepository: Repository<Chat>,
    @InjectRepository(Posting)
    private readonly postingsRepository: Repository<Posting>,
  ) {}

  async getAllChats(userId: string): Promise<Chat[]> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ["chats"],
    });

    if (!user)
      throw new HttpException(
        "User with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    return user.chats;
  }

  async getChat(postingId: string, userId: string): Promise<Chat> {
    const posting = await this.postingsRepository.findOne(postingId, {
      relations: ["user", "chats", "chats.users"],
    });

    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    if (posting.user.id === userId)
      throw new HttpException(
        "You can't chat with yourself",
        HttpStatus.FORBIDDEN,
      );

    console.log(posting);

    const { user: postingOwner, chats: postingChats } = posting;

    const chat = postingChats.find((chat) =>
      chat.users.map((user) => user.id === userId),
    );

    if (chat) {
      const fullChat = await this.chatsRepository.findOne(chat.id, {
        relations: ["messages", "messages.user", "posting"],
      });

      if (!fullChat)
        throw new HttpException(
          "Something went wrong",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return fullChat;
    }

    // chat doesn't exist so create a new one

    const me = await this.usersRepository.findOne(userId);
    if (!me)
      throw new HttpException(
        "User with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    const createdChat = this.chatsRepository.create({
      posting,
      users: [me, postingOwner],
    });
    const savedChat = await this.chatsRepository.save(createdChat);

    return savedChat;
  }
}
