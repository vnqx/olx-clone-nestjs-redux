import { Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import Posting from "../postings/posting.entity";
import User from "../users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FollowPosting } from "../interfaces";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Posting)
    private readonly postingsRepository: Repository<Posting>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // if just followed return true if just unfollowed return false
  async followPosting(id: string, user: User): Promise<FollowPosting> {
    const posting = await this.postingsRepository.findOne(id, {
      relations: ["followers"],
    });
    posting;
    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    // somehow follower === user doesn't work
    const followerIds = posting.followers.map((follower) => follower.id);

    // if not a follower then follow
    if (!followerIds.includes(user.id)) {
      posting.followers.push(user);
      await this.postingsRepository.save(posting);

      return { posting, isFollowed: true };
    } else {
      // else unfollow
      posting.followers = posting.followers.filter(
        (follower) => follower.id !== user.id,
      );
      await this.postingsRepository.save(posting);

      return { posting, isFollowed: false };
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
