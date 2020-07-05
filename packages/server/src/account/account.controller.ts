import { AccountService } from "./account.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import Posting from "../postings/posting.entity";
import { Me } from "../utils/Me";
import User from "../users/user.entity";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get("followed")
  @UseGuards(JwtAuthGuard)
  getAllFollowedPostings(@Me() me: User): Promise<Posting[]> {
    return this.accountService.getAllFollowedPostings(me.id);
  }

  @Get("postings")
  @UseGuards(JwtAuthGuard)
  getAllMyPostings(@Me() me: User): Promise<Posting[]> {
    return this.accountService.getAllMyPostings(me.id);
  }
}
