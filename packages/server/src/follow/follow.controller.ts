import { ReqWithUser } from "./../interfaces";
import { FollowService } from "./follow.service";
import { Controller, Get, Req, Patch, Param, UseGuards } from "@nestjs/common";
import { Posting } from "packages/app/src/types";
import JwtAuthGuard from "../auth/jwtAuth.guard";

@Controller("follow")
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllFollowedPostings(@Req() req: ReqWithUser): Promise<Posting[]> {
    return this.followService.getAllFollowedPostings(req.user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  getById(@Param("id") id: string, @Req() req: ReqWithUser): Promise<boolean> {
    console.log("dd");
    console.log("ddd");

    return this.followService.followPosting(id, req.user);
  }
}
