import { Injectable } from "@nestjs/common";
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

  findAll(): Promise<Posting[]> {
    return this.postingsRepository.find();
  }

  async create(createPostingDto: CreatePostingDto): Promise<Posting> {
    const createdPosting = this.postingsRepository.create(createPostingDto);

    await this.postingsRepository.save(createdPosting);

    return createdPosting;
  }
}
