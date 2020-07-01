import { LocalStrategy } from "./local.strategy";
import { AuthService } from "./auth.service";
import { UsersModule } from "./../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
