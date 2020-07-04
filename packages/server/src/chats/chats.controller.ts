import { ReqWithUser } from "./../interfaces";
import { UseGuards, Req, Param, Body, Post } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { Controller, Get } from "@nestjs/common";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import Chat from "./chat.entity";
import { SendMessageDto } from "./dto/sendMessage.dto";
import Message from "../messages/message.entity";

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get("chats")
  @UseGuards(JwtAuthGuard)
  getAll(@Req() req: ReqWithUser): Promise<Chat[]> {
    return this.chatsService.getAllChats(req.user.id);
  }

  @Post("chats/:id")
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @Req() req: ReqWithUser,
    @Param("id") id: string,
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<Message> {
    return this.chatsService.sendMessage({
      chatId: id,
      sendMessageDto,
      userId: req.user.id,
    });
  }

  @Get("postings/:id/chat")
  @UseGuards(JwtAuthGuard)
  getOne(@Req() req: ReqWithUser, @Param("id") id: string): Promise<Chat> {
    return this.chatsService.getChat(id, req.user.id);
  }
}
