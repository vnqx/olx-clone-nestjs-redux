import { CreatePostingDto } from "./dto/createPosting.dto";
import { Controller, Get, Post, Body } from "@nestjs/common";
import Posting from "./posting.entity";
import PostingsService from "./postings.service";

@Controller("postings")
export default class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Get()
  findAll(): Promise<Posting[]> {
    return this.postingsService.findAll();
  }

  @Post()
  async create(@Body() createPostingDto: CreatePostingDto): Promise<Posting> {
    return this.postingsService.create(createPostingDto);
  }
}
