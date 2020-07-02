import { FileDto } from "./dto/file.dto";
import { CreatePostingDto } from "./dto/createPosting.dto";
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import Posting from "./posting.entity";
import PostingsService from "./postings.service";
import JwtAuthGuard from "../auth/jwtAuth.guard";

@Controller("postings")
export default class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Get()
  getAll(): Promise<Posting[]> {
    return this.postingsService.findAll();
  }

  @Post("create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostingDto: CreatePostingDto): Promise<Posting> {
    return this.postingsService.create(createPostingDto);
  }

  @Post("upload")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("photos"))
  async uploadPhotos(@UploadedFiles() filesDto: FileDto[]): Promise<any> {
    return this.postingsService.uploadPhotos(filesDto);
  }
}
