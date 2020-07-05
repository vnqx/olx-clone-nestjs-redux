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
import { Me } from "../utils/Me";
import User from "../users/user.entity";

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
    @Me() me: User,
  ): Promise<Posting> {
    return this.postingsService.editPosting(id, createPostingDto, me.id);
  }

  @Patch(":id/follow")
  @UseGuards(JwtAuthGuard)
  followPosting(
    @Param("id") id: string,
    @Me() me: User,
  ): Promise<FollowPosting> {
    return this.postingsService.followPosting(id, me);
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPostingDto: CreatePostingDto,
    @Me() me: User,
  ): Promise<Posting> {
    return this.postingsService.create(createPostingDto, me);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: string, @Me() me: User): Promise<boolean> {
    return this.postingsService.delete(id, me.id);
  }
}
