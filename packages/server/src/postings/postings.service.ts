import { Injectable } from "@nestjs/common";
import Posting from "./posting.entity";
import { CreatePostingDto } from "./dto/createPosting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class PostingsService {
  constructor(
    @InjectRepository(Posting) private postingsRepository: Repository<Posting>,
  ) {}

  findAll() {
    return this.postingsRepository.find();
  }

  async create(createPostingDto: CreatePostingDto) {
    const newPosting = this.postingsRepository.create(createPostingDto);
    await this.postingsRepository.save(newPosting);

    return newPosting;
  }
}
