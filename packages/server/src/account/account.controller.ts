import { AccountService } from "./account.service";
import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import { ReqWithUser } from "../interfaces";
import { Posting } from "packages/app/src/types";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get("followed")
  @UseGuards(JwtAuthGuard)
  getAllFollowedPostings(@Req() req: ReqWithUser): Promise<Posting[]> {
    return this.accountService.getAllFollowedPostings(req.user.id);
  }
}
