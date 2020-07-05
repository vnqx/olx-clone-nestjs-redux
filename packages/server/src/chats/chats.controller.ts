import { ReqWithUser } from "./../interfaces";
import { UseGuards, Req, Param, Body, Post } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { Controller, Get } from "@nestjs/common";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import Chat from "./chat.entity";
import { SendMessageDto } from "./dto/sendMessage.dto";
import Message from "../messages/message.entity";
import { Me } from "../utils/Me";
import User from "../users/user.entity";

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get("chats")
  @UseGuards(JwtAuthGuard)
  getAll(@Me() me: User): Promise<Chat[]> {
    return this.chatsService.getAllChats(me.id);
  }

  @Post("chats/:id")
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @Me() me: User,
    @Param("id") id: string,
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<Message> {
    return this.chatsService.sendMessage({
      chatId: id,
      sendMessageDto,
      userId: me.id,
    });
  }

  @Get("postings/:id/chat")
  @UseGuards(JwtAuthGuard)
  getOne(@Me() me: User, @Param("id") id: string): Promise<Chat> {
    return this.chatsService.getChat(id, me.id);
  }
}
