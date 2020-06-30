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

  getAllPostings(): Promise<Posting[]> {
    return this.postingsRepository.find();
  }

  async createPosting(posting: CreatePostingDto): Promise<Posting> {
    const newPosting = this.postingsRepository.create(posting);
    await this.postingsRepository.save(newPosting);

    return newPosting;
  }
}
