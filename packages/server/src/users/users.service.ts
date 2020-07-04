import { CreateUserDto } from "./dto/createUser.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      // TODO
      select: ['id', 'firstName', 'lastName', 'email', 'passwordHash']
    });

    if (!user)
      throw new HttpException(
        "User with this email doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  async getById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return user;
  }
}
