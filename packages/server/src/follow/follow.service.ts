import { Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import Posting from "../postings/posting.entity";
import User from "../users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Posting)
    private readonly postingsRepository: Repository<Posting>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // if just followed return true if just unfollowed return false
  async followPosting(id: string, user: User): Promise<boolean> {
    const posting = await this.postingsRepository.findOne(id, {
      relations: ["followers"],
    });
    posting;
    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    // if not a follower then follow
    if (posting.followers.includes(user)) {
      posting.followers.push(user);
      await this.postingsRepository.save(posting);
      return true;
    } else {
      // else unfollow
      posting.followers = posting.followers.filter(
        (follower) => follower !== user,
      );
      await this.postingsRepository.save(posting);
      return false;
    }
  }

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
}
