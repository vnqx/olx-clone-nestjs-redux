import { ChatsController } from "./chats.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import User from "../users/user.entity";
import Posting from "../postings/posting.entity";
import Chat from "./chat.entity";
import Message from "../messages/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Posting, Chat, Message])],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
