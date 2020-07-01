import { CreateUserDto } from "./dto/createUser.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) return user;

    throw new HttpException(
      "User with this email doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  }
}
