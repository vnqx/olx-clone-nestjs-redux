import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import PostingsController from "./postings.controller";
import PostingsService from "./postings.service";
import Posting from "./posting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  controllers: [PostingsController],
  providers: [PostingsService, ConfigService],
})
export class PostingsModule {}
