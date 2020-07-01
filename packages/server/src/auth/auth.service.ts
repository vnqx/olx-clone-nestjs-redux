import { UsersService } from "./../users/users.service";
import { SignUpDto } from "./dto/signUp.dto";
import bcrypt from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PostgresErrorCode } from "../enums";
import User from "../users/user.entity";
import { SignInDto } from "./dto/signIn.dto";

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
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

  async signIn(signInDto: SignInDto): Promise<User> {
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
}
