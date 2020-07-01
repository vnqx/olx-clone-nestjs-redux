import { PublicUser } from "./../types";
import { SignUpDto } from "./dto/signUp.dto";
import { AuthService } from "./auth.service";
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from "@nestjs/common";
import { LocalAuthGuard } from "./localAuth.guard";
import { ReqWithUser } from "../interfaces";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signUp")
  async signUp(@Body() signUpDto: SignUpDto): Promise<PublicUser> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("signIn")
  async signIn(@Req() req: ReqWithUser): Promise<PublicUser> {
    const { user } = req;
    delete user.passwordHash;
    return user;
  }
}
