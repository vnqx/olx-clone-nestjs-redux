import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import Posting from "./posting.entity";
import { CreatePostingDto } from "./dto/createPosting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "../users/user.entity";
import { FollowPosting } from "../interfaces";

@Injectable()
export default class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private readonly postingsRepository: Repository<Posting>,
  ) {}

  getAll(): Promise<Posting[]> {
    return this.postingsRepository.find({ order: { createdAt: "DESC" } });
  }

  async getById(id: string): Promise<Posting> {
    const posting = await this.postingsRepository.findOne(id);
    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    return posting;
  }

  async getByTitle(filter: string): Promise<Posting[]> {
    const postings = await this.postingsRepository
      .createQueryBuilder()
      .select()
      .where("title ILIKE :filter", { filter: `%${filter}%` })
      .getMany();

    return postings;
  }

  async editPosting(
    id: string,
    createPostingDto: CreatePostingDto,
    userId: string,
  ): Promise<Posting> {
    const posting = await this.postingsRepository.findOne(id, {
      relations: ["user"],
    });

    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    if (posting.user.id !== userId)
      throw new HttpException(
        "You can only edit your own postings",
        HttpStatus.FORBIDDEN,
      );

    await this.postingsRepository.update(posting.id, createPostingDto);

    const updatedPosting = await this.postingsRepository.findOne(id);
    console.log(updatedPosting);

    if (!updatedPosting)
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return updatedPosting;
  }

  async create(
    createPostingDto: CreatePostingDto,
    user: User,
  ): Promise<Posting> {
    const createdPosting = this.postingsRepository.create({
      ...createPostingDto,
      user,
    });
    await this.postingsRepository.save(createdPosting);

    return createdPosting;
  }

  async delete(postingId: string, user: User): Promise<boolean> {
    const posting = await this.postingsRepository.findOne(postingId, {
      relations: ["user"],
    });

    if (!posting)
      throw new HttpException(
        "Posting with this id doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    if (posting.user.id !== user.id)
      throw new HttpException(
        "You can delete your own postings only",
        HttpStatus.FORBIDDEN,
      );

    await this.postingsRepository.remove(posting);

    return true;
  }

  // if just followed return true if just unfollowed return false
  async followPosting(id: string, user: User): Promise<FollowPosting> {
    const posting = await this.postingsRepository.findOne(id, {
      relations: ["followers"],
    });

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
}
