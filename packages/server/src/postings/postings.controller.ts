import { CreatePostingDto } from "./dto/createPosting.dto";
import { Controller, Get, Post, Body } from "@nestjs/common";
import Posting from "./posting.entity";
import PostingsService from "./postings.service";

@Controller("postings")
export default class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Get()
  getAllPostings(): Promise<Posting[]> {
    return this.postingsService.getAllPostings();
  }

  @Post()
  async createPosting(@Body() posting: CreatePostingDto): Promise<Posting> {
    return this.postingsService.createPosting(posting);
  }
}
