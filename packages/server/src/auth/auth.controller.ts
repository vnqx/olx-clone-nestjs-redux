import { PublicUser } from "./../types";
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
import JwtAuthGuard from "./jwtAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(
    @Body() input: SignUpInput,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.signUp(input);
    const token = this.authService.generateToken({ userId: user.id });
    res.cookie("token", `Bearer ${token}`, {
      httpOnly: true,
    });

    return res.sendStatus(200);
  }

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  async signIn(
    @Req() req: ReqWithUser,
    @Res() res: Response,
  ): Promise<Response> {
    const token = this.authService.generateToken({ userId: req.user.id });
    res.cookie("token", `Bearer ${token}`, {
      httpOnly: true,
    });

    return res.sendStatus(200);
  }

  @Post("sign-out")
  signOut(@Res() res: Response): Response {
    res.clearCookie("token");
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMe(@Req() req: ReqWithUser): PublicUser {
    return req.user;
  }
}
