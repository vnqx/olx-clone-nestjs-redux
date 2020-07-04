import { Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../users/user.entity";
import Posting from "../postings/posting.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAllFollowedPostings(userId: string): Promise<Posting[]> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ["followedPostings"],
    });
    if (!user)
      throw new HttpException(
        "User with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    return user.followedPostings;
  }

  async getAllMyPostings(userId: string): Promise<Posting[]> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ["myPostings"],
    });

    console.log(user);

    if (!user)
      throw new HttpException(
        "User with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    return user.myPostings;
  }
}
