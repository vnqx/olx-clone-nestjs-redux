import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
