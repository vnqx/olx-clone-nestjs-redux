import { ReqWithUser, FollowPosting } from "./../interfaces";
import { CreatePostingDto } from "./dto/createPosting.dto";
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Req,
  Delete,
  Put,
} from "@nestjs/common";
import Posting from "./posting.entity";
import PostingsService from "./postings.service";
import JwtAuthGuard from "../auth/jwtAuth.guard";

@Controller("postings")
export default class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Get()
  getAll(): Promise<Posting[]> {
    console.log("dd");

    return this.postingsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): Promise<Posting> {
    return this.postingsService.getById(id);
  }

  @Get("search/:filter")
  getByTitle(@Param("filter") filter: string): Promise<Posting[]> {
    return this.postingsService.getByTitle(filter);
  }

  @Put(":id/edit")
  @UseGuards(JwtAuthGuard)
  editPosting(
    @Param("id") id: string,
    @Body() createPostingDto: CreatePostingDto,
    @Req() req: ReqWithUser,
  ): Promise<Posting> {
    return this.postingsService.editPosting(id, createPostingDto, req.user.id);
  }

  @Patch(":id/follow")
  @UseGuards(JwtAuthGuard)
  followPosting(
    @Param("id") id: string,
    @Req() req: ReqWithUser,
  ): Promise<FollowPosting> {
    return this.postingsService.followPosting(id, req.user);
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPostingDto: CreatePostingDto,
    @Req() req: ReqWithUser,
  ): Promise<Posting> {
    return this.postingsService.create(createPostingDto, req.user);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: string, @Req() req: ReqWithUser): Promise<boolean> {
    console.log("hi");

    return this.postingsService.delete(id, req.user);
  }
}
