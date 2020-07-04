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
import {TokenPayload} from "../interfaces";

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

  async validateUser(email: string, password: string): Promise<PublicUser> {
    const user = await this.usersService.getByEmail(email);
    const isPasswordValid = await bcryptjs.compare(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new UnauthorizedException();

    delete user.passwordHash
    return user
  }

  generateToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload)
  }
}
