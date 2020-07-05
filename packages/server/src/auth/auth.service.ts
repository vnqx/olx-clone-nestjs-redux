import { ConfigService } from "@nestjs/config";
import { PublicUser } from "../types";
import { SignUpInput } from "./input/SignUpInput";
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PostgresErrorCode } from "../enums";
import { SignInInput } from "./input/SignInInput";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcryptjs from "bcryptjs";
import { TokenPayload } from "../interfaces";
import { Request, Response } from "express";
import User from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(input: SignUpInput): Promise<PublicUser> {
    const { password, ...publicUser } = input;

    const passwordHash = await bcryptjs.hash(password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...publicUser,
        passwordHash,
      });

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

  async validateUser(email: string, password: string): Promise<PublicUser> {
    const user = await this.usersService.getByEmail(email);
    const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new UnauthorizedException();

    delete user.passwordHash;
    return user;
  }

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  extractTokenFromRequest(req: Request): string | null {
    const tokenWithBearer: string | undefined = req.cookies.token;
    if (tokenWithBearer) {
      return tokenWithBearer.replace("Bearer ", "");
    }
    return null;
  }

  handleTokenResponse(user: User | PublicUser, res: Response): Response {
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
    });

    res.cookie("token", `Bearer ${token}`, {
      httpOnly: true,
    });

    return res.sendStatus(200);
  }
}
