import { Response } from "express";
import { ReqWithUser } from "./../interfaces";
import { ConfigService } from "@nestjs/config";
import { PublicUser } from "./../types";
import { UsersService } from "./../users/users.service";
import { SignUpDto } from "./dto/signUp.dto";
import bcrypt from "bcrypt";
import { HttpException, HttpStatus, Req, Res } from "@nestjs/common";
import { PostgresErrorCode } from "../enums";
import { SignInDto } from "./dto/signIn.dto";
import { Token } from "../interfaces";
import { JwtService } from "@nestjs/jwt";

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<PublicUser> {
    const { password, ...userData } = signUpDto;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...userData,
        passwordHash,
      });

      delete createdUser.passwordHash;

      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("Email already taken", HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInDto: SignInDto): Promise<PublicUser> {
    try {
      const user = await this.usersService.findByEmail(signInDto.email);
      await this.verifyPassword(signInDto.password, user.passwordHash);
      delete user.passwordHash;
      return user;
    } catch (error) {
      throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(password: string, passwordHash: string) {
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid)
      throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);
  }

  getCookieWithJwtToken(userId: number): string {
    const payload: Token = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRES_IN",
    )}`;
  }

  getCookieForSignOut(): string {
    return "Authentication=; HttpOnly; Path=/; Max-Age=0";
  }
}
