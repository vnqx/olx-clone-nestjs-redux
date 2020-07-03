import { ReqWithUser, FollowPosting } from "./../interfaces";
import { FollowService } from "./follow.service";
import { Controller, Get, Req, Patch, Param, UseGuards } from "@nestjs/common";
import { Posting } from "packages/app/src/types";
import JwtAuthGuard from "../auth/jwtAuth.guard";

@Controller()
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get("followed")
  @UseGuards(JwtAuthGuard)
  getAllFollowedPostings(@Req() req: ReqWithUser): Promise<Posting[]> {
    return this.followService.getAllFollowedPostings(req.user.id);
  }

  @Patch("postings/:id/follow")
  @UseGuards(JwtAuthGuard)
  followPosting(
    @Param("id") id: string,
    @Req() req: ReqWithUser,
  ): Promise<FollowPosting> {
    return this.followService.followPosting(id, req.user);
  }
}
