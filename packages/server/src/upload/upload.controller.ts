import { UploadService } from "./upload.service";
import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import JwtAuthGuard from "../auth/jwtAuth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileDto } from "../postings/dto/file.dto";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("photos"))
  async uploadPhotos(@UploadedFiles() filesDto: FileDto[]): Promise<string[]> {
    return this.uploadService.uploadPhotos(filesDto);
  }
}
