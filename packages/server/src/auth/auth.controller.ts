import { PublicUser } from "../types";
import { SignUpInput } from "./input/SignUpInput";
import { AuthService } from "./auth.service";
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from "@nestjs/common";
import { LocalAuthGuard } from "./localAuth.guard";
import { ReqWithUser } from "../interfaces";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { Me } from "../utils/Me";
import User from "../users/user.entity";
import JwtAuthGuard from "./jwtAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post("sign-up")
  async signUp(
    @Body() input: SignUpInput,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.signUp(input);
    return this.authService.handleTokenResponse(user, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  async signIn(@Me() user: User, @Res() res: Response): Promise<Response> {
    return this.authService.handleTokenResponse(user, res);
  }

  @Post("sign-out")
  signOut(@Res() res: Response): Response {
    res.clearCookie("token");
    return res.sendStatus(200);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMe(@Me() user: User): User {
    return user;
  }
}
