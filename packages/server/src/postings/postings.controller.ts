import { CreatePostingDto } from "./dto/createPosting.dto";
import { Controller, Get, Post, Body, UseGuards, Param } from "@nestjs/common";
import Posting from "./posting.entity";
import PostingsService from "./postings.service";
import JwtAuthGuard from "../auth/jwtAuth.guard";

@Controller("postings")
export default class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Get()
  getAll(): Promise<Posting[]> {
    return this.postingsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): Promise<Posting> {
    return this.postingsService.getById(id);
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostingDto: CreatePostingDto): Promise<Posting> {
    return this.postingsService.create(createPostingDto);
  }
}
