import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import Posting from "./posting.entity";
import { CreatePostingDto } from "./dto/createPosting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async create(createPostingDto: CreatePostingDto): Promise<Posting> {
    const createdPosting = this.postingsRepository.create(createPostingDto);

    await this.postingsRepository.save(createdPosting);

    return createdPosting;
  }
}
