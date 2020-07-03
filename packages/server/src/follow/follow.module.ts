import { FollowController } from "./follow.controller";
import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../users/user.entity";
import Posting from "../postings/posting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Posting])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
